'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import type { InferOutput } from 'valibot'

import FormInput from '@/components/form-components/FormInput'
import AuthLayout from '@/common/AuthLayout'
import { loginSchema } from '@/schemas/validation-schemas'
import { loginUser } from '@/services/auth-apis/auth-api'
import { storeToken } from '@/utils/tokenSync'
import { setTenderInformation } from '@/redux-store/slices/tenderInformationSlice'
import { isPmaPortal } from '@/utils/portalHelper'

type LoginFormData = InferOutput<typeof loginSchema>

const LoginPage = ({ portal = isPmaPortal() ? 'pma_portal' : 'rmc_portal' }: LoginPortalProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      if (data) {
        storeToken(data?.data.token, data?.data?.user?.user_type)

        if (data?.data?.onboarding) {
          dispatch(setTenderInformation(data?.data?.onboarding))
        }

        router.push('/dashboard')
        toast.success('Login successful!')
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Login failed. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleLogin: SubmitHandler<LoginFormData> = async data => {
    if (isSubmitting || isLoading) return

    setIsSubmitting(true)
    login({
      email: data?.email,
      password: data?.password
    })
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  const handleOnboarding = () => {
    router.push(isPmaPortal() ? '/company' : '/onboarding')
  }

  const commonStyles = { background: 'white', borderRadius: '6px' }
  const signupText = isPmaPortal() ? 'New PMA User? Start here' : 'New RMC Director? Start here'

  console.log(signupText)

  return (
    <AuthLayout>
      <div className='text-center mb-8 py-6'>
        <Typography
          variant='h4'
          className='text-[#0B2952] text-[32px] font-bold mb-2'
          sx={{ fontSize: '28px', fontWeight: 700 }}
        >
          {portal === 'pma_portal' ? 'PMA Login': 'RMC Login'}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
        <FormInput name='email' control={control} placeholder='Email' type='email' sx={commonStyles} />
        <FormInput
          name='password'
          control={control}
          placeholder='Password'
          type='password'
          sx={commonStyles}
          showPasswordToggle={true}
        />
        <div className='flex items-center justify-end w-full'>
          <p onClick={handleForgotPassword} className='text-[#0B2952] text-sm font-medium cursor-pointer'>
            Forgot Password?
          </p>
        </div>
        <div className='flex justify-center mb-2'>
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
            {isSubmitting || isLoading ? <div className='text-white'>Logging in...</div> : 'Login'}
          </Button>
        </div>
        <p onClick={handleOnboarding} className='font-medium mt-4 text-[#0B2952] text-center cursor-pointer'>
          Don’t have an account? Sign up here.
        </p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
