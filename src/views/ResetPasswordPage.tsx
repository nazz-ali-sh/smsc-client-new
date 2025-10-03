'use client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Typography, Button } from '@mui/material'

import type { InferOutput } from 'valibot'

import FormInput from '@/components/form-components/FormInput'
import AuthLayout from '@/common/AuthLayout'
import { resetPasswordSchema } from '@/schemas/validation-schemas'
import { resetPassword } from '@/services/auth-apis/auth-api'

const ResetPasswordPage = () => {
  type ResetPasswordFormData = InferOutput<typeof resetPasswordSchema>

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const emailFromUrl = searchParams.get('email')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit, setValue } = useForm<ResetPasswordFormData>({
    resolver: valibotResolver(resetPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: emailFromUrl || '',
      password: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    if (emailFromUrl) {
      setValue('email', emailFromUrl)
    }

    if (!token) {
      toast.error('Invalid reset link. Please use the link from your email.')
    }
  }, [emailFromUrl, setValue, token])

  const { mutate: resetUserPassword, isPending: isLoading } = useMutation({
    mutationFn: resetPassword,
    onSuccess: data => {
      if (data) {
        router.push('/login')
        toast.success(data.message || 'Password reset successfully!')
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Failed to reset password. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleResetPassword: SubmitHandler<ResetPasswordFormData> = async data => {
    if (isSubmitting || isLoading) return

    if (!token) {
      toast.error('Reset token is missing. Please use the link from your email.')

      return
    }

    setIsSubmitting(true)
    resetUserPassword({
      token: token,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    })
  }

  const commonStyles = { background: 'white', borderRadius: '6px' }

  return (
    <AuthLayout>
      <div className='text-center mb-8 py-6'>
        <Typography
          variant='h4'
          className='text-[#0B2952] text-[32px] font-bold mb-2'
          sx={{ fontSize: '28px', fontWeight: 700 }}
        >
          Reset Password
        </Typography>
        <Typography className='text-gray-600 text-sm mt-2'>
          Enter your email and new password to reset your account
        </Typography>
      </div>
      <form onSubmit={handleSubmit(handleResetPassword)} className='space-y-4'>
        <FormInput name='email' control={control} placeholder='Email Address' type='email' sx={commonStyles} />
        <FormInput name='password' control={control} placeholder='New Password' type='password' sx={commonStyles} showPasswordToggle={true} />
        <FormInput
          name='confirmPassword'
          control={control}
          placeholder='Confirm New Password'
          type='password'
          showPasswordToggle={true}
          sx={commonStyles}
        />

        <div className='flex justify-center mt-5'>
          <Button
            variant='contained'
            type='submit'
            disabled={isSubmitting || isLoading}
            sx={{
              backgroundColor: '#35C0ED',
              color: '#fff',
              width: 250,
              fontSize: '14px',
              fontWeight: 700,
              padding: '10px 20px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#2ba8d1'
              },
              '&:disabled': {
                backgroundColor: '#35C0ED',
                opacity: 0.6
              }
            }}
          >
            {isSubmitting || isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ResetPasswordPage
