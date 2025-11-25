'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import CustomButton from '@/common/CustomButton'
import {
  submitPmaGoogleReviewsSetup,
  type PmaGoogleReviewsSetupPayload
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { PMA_ROUTES } from '@/constants'

const PmaGoogleReviewsView = () => {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<'manually' | 'auto' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: onboardingData } = usePmaOnboardingData()

  const mutation = useMutation({
    mutationFn: submitPmaGoogleReviewsSetup,
    onSuccess: () => {
      if (selectedMethod === 'manually') {
        router.push(PMA_ROUTES.REVIEWS_FORM)
      } else if (selectedMethod === 'auto') {
        router.push(PMA_ROUTES.TRUSTPILOT_REVIEWS)
      } else {
        router.push(PMA_ROUTES.REVIEWS_FORM)
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save Google reviews preference.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const createPayload = (googleReviews: string): PmaGoogleReviewsSetupPayload => {
    const step5 = onboardingData?.data?.step_5

    return {
      step: 5,
      google_reviews: googleReviews,
      google_average_rating: step5?.google_average_rating || '',
      google_number_of_reviews: step5?.google_number_of_reviews || '',
      trustpilot_reviews: step5?.trustpilot_reviews || '',
      trustpilot_average_rating: step5?.trustpilot_average_rating || '',
      trustpilot_number_of_reviews: step5?.trustpilot_number_of_reviews || '',
      google_reviews_report: step5?.google_reviews_report || false,
      trustpilot_reviews_report: step5?.trustpilot_reviews_report || false
    }
  }

  const handleReviewMethod = (method: 'manually' | 'auto') => {
    if (isSubmitting || mutation.isPending) return
    setSelectedMethod(method)
    setIsSubmitting(true)

    const payload = createPayload(method === 'manually' ? 'manual' : 'auto')

    mutation.mutate(payload)
  }

  const reviewOptions = [
    {
      key: 'manually' as const,
      label: 'Manually',
      icon: '/svgs/googleReviews.svg'
    },
    {
      key: 'auto' as const,
      label: 'Auto Sync',
      icon: '/svgs/googleReviews.svg'
    }
  ]

  const handleSkip = () => {
    if (isSubmitting || mutation.isPending) return
    setIsSubmitting(true)

    const payload = createPayload('')

    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.BUSINESS_PROFILE)
  }

  React.useEffect(() => {
    const choice = onboardingData?.data?.step_5?.google_reviews

    if (choice === 'manual') setSelectedMethod('manually')
    else if (choice === 'auto') setSelectedMethod('auto')
  }, [onboardingData])

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>PMA Sign Up</h1>
      <div className='bg-white p-8 pt-10 w-full mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Google Reviews
        </Typography>

        <Typography variant='body2' sx={{ fontSize: '18px', fontWeight: 400, color: '#696969', marginBottom: '24px' }}>
          How would you like to give Google reviews for your business? Please choose an option below.
        </Typography>

        <div className='flex justify-center py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 pb-6'>
            {reviewOptions.map(option => {
              const isSelected = selectedMethod === option.key

              return (
                <div
                  key={option.key}
                  onClick={() => handleReviewMethod(option.key)}
                  className={`group flex flex-col items-center p-6 shadow-sm rounded-md w-[280px] h-[318px] justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F3FCFE] border-[1px] border-[#35C0ED] shadow-lg'
                      : 'bg-[#F3FCFE] hover:bg-[#D7F2FB] border border-blue-100'
                  }`}
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
          <CustomButton onClick={handleBack} startIcon={<i className='ri-arrow-left-line'></i>} variant='outlined'>
            Back
          </CustomButton>
          <CustomButton onClick={handleSkip} variant='outlined' disabled={isSubmitting || mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Skip'}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default PmaGoogleReviewsView
