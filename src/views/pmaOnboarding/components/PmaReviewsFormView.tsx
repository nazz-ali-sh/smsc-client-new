'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Grid, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import FormInput from '@/components/form-components/FormInput'
import { reviewsFormSchema } from '@/schemas/validation-schemas'
import {
  submitPmaGoogleReviewsSetup,
  type PmaGoogleReviewsSetupPayload
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { PMA_ROUTES } from '@/constants'

type ReviewsFormData = {
  averageRating: string
  numberOfReviews: string
}

export default function PmaReviewsFormView() {
  const router = useRouter()
  const [showOnShortlist, setShowOnShortlist] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleReviewModalOpen, setIsGoogleReviewModalOpen] = useState(false)
  const { data: onboardingData } = usePmaOnboardingData()

  const { control, handleSubmit, reset } = useForm<ReviewsFormData>({
    resolver: valibotResolver(reviewsFormSchema),
    defaultValues: {
      averageRating: '',
      numberOfReviews: ''
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: submitPmaGoogleReviewsSetup,
    onSuccess: () => {
      router.push(PMA_ROUTES.TRUSTPILOT_REVIEWS)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to submit reviews. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const onSubmit = (data: ReviewsFormData) => {
    if (isSubmitting || mutation.isPending) return

    setIsSubmitting(true)

    const step5 = onboardingData?.data?.step_5

    const payload: PmaGoogleReviewsSetupPayload = {
      step: 5,
      google_reviews: step5?.google_reviews || '',
      google_average_rating: data.averageRating || '',
      google_number_of_reviews: data.numberOfReviews || '',
      trustpilot_reviews: step5?.trustpilot_reviews || '',
      trustpilot_average_rating: step5?.trustpilot_average_rating || '',
      trustpilot_number_of_reviews: step5?.trustpilot_number_of_reviews || '',
      google_reviews_report: showOnShortlist,
      trustpilot_reviews_report: step5?.trustpilot_reviews_report || false
    }

    mutation.mutate(payload)
  }

  const handleModalClose = () => {
    setIsGoogleReviewModalOpen(false)
  }

  const handleNext = () => {
    handleSubmit(onSubmit)()
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.GOOGLE_REVIEWS)
  }

  const handleSkip = () => {
    router.push(PMA_ROUTES.TRUSTPILOT_REVIEWS)
  }

  const handleHideClick = () => {
    setShowOnShortlist(false)
  }

  const handleShowClick = () => {
    setShowOnShortlist(true)
  }

  React.useEffect(() => {
    const step5 = onboardingData?.data?.step_5

    if (step5) {
      reset({
        averageRating: step5?.google_average_rating?.toString() || '',
        numberOfReviews: step5?.google_number_of_reviews?.toString() || ''
      })

      setShowOnShortlist(step5?.google_reviews_report || false)
    }
  }, [onboardingData, reset])

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>PMA Sign Up</h1>
      <div className='flex items-center justify-center p-4 bg-white mt-8 mb-20'>
        <div className='p-4 rounded-lg w-full'>
          <form>
            <h2 className='text-2xl font-medium text-[#262B43E5]'>Reviews</h2>

            <p className='mt-6 mb-12 font-normal text-base leading-6 text-[#696969]'>
              Manually add your Google reviews below. These will appear on your profile and help RMC directors
              understand the experience you provide.
            </p>

            <div className='mb-8'>
              <div className='flex gap-8 items-center mb-4'>
                <div className='flex'>
                  <h3 className='text-base font-medium text-[#262B43E5]'>Google Reviews</h3>
                  <i className='ri-information-line ml-1 text-xl' onClick={() => setIsGoogleReviewModalOpen(true)}></i>
                </div>
                <div className='flex items-center gap-1 text-sm font-normal'>
                  <span
                    onClick={handleHideClick}
                    className={`cursor-pointer font-medium  ${!showOnShortlist ? 'text-[#35C0ED]' : 'text-[#696969]'}`}
                  >
                    Hide
                  </span>
                  <span className='text-[#696969]'>/</span>
                  <span
                    onClick={handleShowClick}
                    className={`cursor-pointer font-medium ${showOnShortlist ? 'text-[#35C0ED] ' : 'text-[#696969]'}`}
                  >
                    Show on shortlist report
                  </span>
                </div>
              </div>

              <p className='text-xs font-normal text-[#696969] mb-6 flex items-start'>
                <span className='mr-1'>●</span>
                <span>
                  These scores are only displayed to RMCs when you're shortlisted. If left blank, a dash (-) will
                  appear.
                </span>
              </p>

              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='averageRating'
                    control={control}
                    label='Average Rating'
                    type='number'
                    placeholder='Average Rating (1-5)'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='numberOfReviews'
                    control={control}
                    label='Number of Reviews'
                    type='number'
                    placeholder='Number of Reviews'
                  />
                </Grid>
              </Grid>
            </div>

            <div className='flex justify-between mt-32 gap-2'>
              <CustomButton
                variant='outlined'
                onClick={handleBack}
                startIcon={<i className='ri-arrow-left-line'></i>}
                sx={{ fontSize: '14px', fontWeight: 700 }}
              >
                Back
              </CustomButton>

              <div className='flex gap-2'>
                <CustomButton
                  variant='outlined'
                  onClick={handleSkip}
                  sx={{ fontSize: '14px', fontWeight: 700 }}
                  disabled={isSubmitting || mutation.isPending}
                >
                  Skip
                </CustomButton>
                <CustomButton
                  variant='contained'
                  onClick={handleNext}
                  endIcon={<i className='ri-arrow-right-line'></i>}
                  sx={{ fontSize: '14px', fontWeight: 700 }}
                  disabled={isSubmitting || mutation.isPending}
                  isLoading={mutation.isPending}
                >
                  {mutation.isPending ? 'Processing...' : 'Next'}
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>

      <CommonModal
        isOpen={isGoogleReviewModalOpen}
        headerSx={{ color: '#1F4E8D', fontSize: '20px', fontWeight: 600, marginLeft: '14px' }}
        isBorder
        maxWidth='sm'
        handleClose={handleModalClose}
        header='Google Reviews'
      >
        <div className='py-4'>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            You can manually add your Google reviews here. Adding them is optional, but remember that RMCs will often
            check Google reviews once they shortlist a managing agent.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            Be honest and include your real reviews. At Save My Service Charge, we remind RMCs that Google reviews
            are not always a reliable measure of a Property Management Company’s performance — many negative reviews can
            come from blocks with poor or inactive RMC/RTM directorship, rather than from the agent’s service.
          </Typography>
          <Typography variant='body2' className='text-sm text-[#696969] mb-6'>
            Use the toggle to show or hide your Google reviews on your profile at any time.
          </Typography>
        </div>
      </CommonModal>
    </>
  )
}
