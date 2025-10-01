'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Typography, Button } from '@mui/material'

import type { InferOutput } from 'valibot'

import FormInput from '@/components/form-components/FormInput'
import AuthLayout from '@/common/AuthLayout'
import { forgotPasswordRequestSchema } from '@/schemas/validation-schemas'
import { forgotPassword } from '@/services/auth-apis/auth-api'

const ForgotPasswordPage = () => {
  type ForgotPasswordFormData = InferOutput<typeof forgotPasswordRequestSchema>

  const router = useRouter()

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: valibotResolver(forgotPasswordRequestSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  })

  const { mutate: sendForgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: data => {
      if (data?.status === 'success') {
        router.push('/login')
        toast.success(data.message || 'Password reset email sent successfully!')
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Failed to send reset email. Please try again.'

      toast.error(errorMessage)
    }
  })

  const handleForgotPassword: SubmitHandler<ForgotPasswordFormData> = async data => {
    sendForgotPassword({
      email: data.email
    })
  }

  const handleBackToLogin = () => {
    router.push('/login')
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
          Forgot Password
        </Typography>
        <Typography className='text-gray-600 text-sm mt-2'>
          Enter your email address to receive a password reset link
        </Typography>
      </div>
      <form onSubmit={handleSubmit(handleForgotPassword)} className='space-y-4'>
        <FormInput name='email' control={control} placeholder='Email Address' type='email' sx={commonStyles} />
        <div className='flex justify-end py-2'>
          <p onClick={handleBackToLogin} className='text-[#0B2952] text-sm font-medium cursor-pointer'>
            Back to Login
          </p>
        </div>
        <div className='flex justify-center'>
          <Button
            variant='contained'
            type='submit'
            disabled={isLoading}
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
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
