'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import {
  submitPmaEmailNotification,
  type PmaEmailNotificationPayload
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { PMA_ROUTES } from '@/constants'

const PmaEmailNotificationView = () => {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<'primary' | 'secondary' | 'both' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: onboardingData } = usePmaOnboardingData()

  const mutation = useMutation({
    mutationFn: submitPmaEmailNotification,
    onSuccess: () => {
      router.push(PMA_ROUTES.MANAGEMENT)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save preferences. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  React.useEffect(() => {
    const step6 = onboardingData?.data?.step_6

    if (step6?.received_email_notification) {
      setSelectedMethod(step6?.received_email_notification as 'primary' | 'secondary' | 'both')
    }
  }, [onboardingData])

  const createPayload = (emailNotification: string): PmaEmailNotificationPayload => {
    return {
      step: 6,
      received_email_notification: emailNotification
    }
  }

  const handleNotificationMethod = (method: 'primary' | 'secondary' | 'both') => {
    if (isSubmitting || mutation.isPending) return

    setSelectedMethod(method)
    setIsSubmitting(true)

    const payload = createPayload(method)
    mutation.mutate(payload)
  }

  const notificationOptions = [
    {
      key: 'primary' as const,
      label: 'Primary User',
      icon: '/svgs/primaryUser.svg'
    },
    {
      key: 'secondary' as const,
      label: 'Secondary User',
      icon: '/svgs/secondaryUser.svg'
    },
    {
      key: 'both' as const,
      label: 'Both',
      icon: '/svgs/bothUsers.svg'
    }
  ]

  const handleSkip = () => {
    if (isSubmitting || mutation.isPending) return
    setIsSubmitting(true)

    const payload = createPayload('')
    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.TRUSTPILOT_FORM)
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>PMA Sign Up</h1>
      <div className='bg-white p-8 pt-10 w-full mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Who Receives Email Notifications
        </Typography>

        <Typography variant='body2' sx={{ fontSize: '18px', fontWeight: 400, color: '#696969', marginBottom: '24px' }}>
          Please select who will receive email notifications for your company.
        </Typography>

        <div className='flex justify-center py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-16 pb-6'>
            {notificationOptions.map(option => {
              const isSelected = selectedMethod === option.key

              return (
                <div
                  key={option.key}
                  onClick={() => handleNotificationMethod(option.key)}
                  className={`group flex flex-col items-center p-6 shadow-sm rounded-md w-[280px] h-[318px] justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F3FCFE] border-[1px] border-[#35C0ED] shadow-lg'
                      : 'bg-[#F3FCFE] hover:bg-[#D7F2FB] border border-blue-100'
                  } ${isSubmitting || mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className='flex items-center justify-center flex-grow'>
                    <div className='transition-transform duration-300 group-hover:scale-125'>
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
                    {option.label}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex justify-between items-center mt-6'>
          <CustomButton
            onClick={handleBack}
            startIcon={<i className='ri-arrow-left-line'></i>}
            variant='outlined'
            sx={{ fontSize: '14px', fontWeight: 700 }}
          >
            Back
          </CustomButton>
          <CustomButton
            onClick={handleSkip}
            variant='outlined'
            endIcon={<i className='ri-arrow-right-line'></i>}
            sx={{ fontSize: '14px', fontWeight: 700 }}
            disabled={mutation.isPending}
          >
            Skip
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default PmaEmailNotificationView
