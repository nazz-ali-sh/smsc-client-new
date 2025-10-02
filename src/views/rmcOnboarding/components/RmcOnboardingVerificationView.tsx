'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'

import { onboardingVerification, type verificationPayload } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { setVerificationMethod } from '@/redux-store/slices/rmcOnboardingSlice'
import CustomButton from '@/common/CustomButton'

const RmcOnboardingVerificationView = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const rmcData = useSelector((state: any) => state.rmcOnboarding.rmcData)
  const verificationMethod = useSelector((state: any) => state.rmcOnboarding.verificationMethod)
  const [selectedMethod, setSelectedMethod] = useState<'sms' | 'email' | null>(verificationMethod)
  const userId = rmcData?.user_id

  const mutation = useMutation({
    mutationFn: onboardingVerification,
    onSuccess: () => {
      router.push('/rmc-onboarding-otp')
    },
    onError: (error: any) => {
      const method = selectedMethod === 'sms' ? 'SMS' : 'Email'

      const errorMessage = error?.response?.data?.message || `Failed to send ${method} verification. Please try again.`

      toast.error(errorMessage)
    }
  })

  const handleVerificationMethod = (method: 'sms' | 'email') => {
    if (!userId) {
      toast.error('User ID not found. Please try again.')

      return
    }

    setSelectedMethod(method)
    dispatch(setVerificationMethod(method))

    const payload: verificationPayload = {
      user_id: userId,
      verification_method: method
    }

    mutation.mutate(payload)
  }

  const verificationOptions = [
    {
      key: 'sms' as const,
      label: 'SMS',
      icon: '/svgs/smsIcon.svg'
    },
    {
      key: 'email' as const,
      label: 'Email',
      icon: '/svgs/emailIcon.svg'
    }
  ]

  const handleBack = () => {
    router.push('/rmc-onboarding-director')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Verification
        </Typography>

        <div className='flex justify-center py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 pb-6'>
            {verificationOptions.map(option => {
              const isSelected = selectedMethod === option.key
              const isPending = mutation.isPending && isSelected

              return (
                <div
                  key={option.key}
                  onClick={() => !isPending && handleVerificationMethod(option.key)}
                  className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer w-[280px] h-[318px] justify-between transition-all duration-300 ${
                    isPending
                      ? 'bg-gray-100 cursor-not-allowed border-[1px] border-gray-300'
                      : isSelected
                        ? 'bg-[#F3FCFE] border-[1px] border-[#35C0ED] shadow-lg'
                        : 'bg-[#F3FCFE] hover:bg-[#D7F2FB] border border-blue-100'
                  }`}
                >
                  <div className='flex items-center justify-center flex-grow'>
                    <div className={`transition-transform duration-300 ${isPending ? '' : 'group-hover:scale-125'}`}>
                      <Image src={option.icon} alt={option.label} width={150} height={150} className='mb-4' />
                    </div>
                  </div>
                  <Typography
                    variant='body1'
                    sx={{
                      color: 'customColors.gray10',
                      fontSize: '15px',
                      fontWeight: 500,
                      paddingTop: '14px'
                    }}
                    className='text-center'
                  >
                    {isPending ? 'Sending...' : option.label}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>
        <CustomButton onClick={handleBack} startIcon={<i className='ri-arrow-left-line'></i>} variant='outlined'>
          Back
        </CustomButton>
      </div>
    </div>
  )
}

export default RmcOnboardingVerificationView
