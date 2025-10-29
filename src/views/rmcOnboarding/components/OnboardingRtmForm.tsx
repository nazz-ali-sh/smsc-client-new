'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Typography, Grid, Box } from '@mui/material'
import type { InferOutput } from 'valibot'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import { rtmNonDirectorSchema } from '@/schemas/validation-schemas'
import { submitRtmNonDirector, type RtmNonDirectorPayload } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { setPersonalInfo, clearRtmNonDirectorData } from '@/redux-store/slices/rtmNonDirectorSlice'
import { rmtFormInputs } from '@/constants'

type RtmFormData = InferOutput<typeof rtmNonDirectorSchema>

const OnboardingRtmForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { rtmSetup, questions, personalInfo } = useSelector((state: any) => state?.rtmNonDirector)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit } = useForm<RtmFormData>({
    resolver: valibotResolver(rtmNonDirectorSchema),
    defaultValues: {
      name: personalInfo?.name,
      email: personalInfo?.email,
      phone_no: personalInfo?.phone_no
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: submitRtmNonDirector,
    onSuccess: data => {
      if (data) {
        dispatch(clearRtmNonDirectorData())
        router.replace('/onboarding')
      }

      setIsSubmitting(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to submit RTM setup. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleFormSubmit = (data: RtmFormData) => {
    if (isSubmitting || mutation.isPending) return
    setIsSubmitting(true)

    dispatch(
      setPersonalInfo({
        name: data.name,
        email: data.email,
        phone_no: data.phone_no
      })
    )

    const payload: RtmNonDirectorPayload = {
      name: data?.name,
      email: data?.email,
      phone_no: data?.phone_no,
      rtm_setup: rtmSetup || '',
      q_independent_redevelopment: questions?.q_independent_redevelopment || '',
      q_separable_shared_services: questions?.q_separable_shared_services || '',
      q_units_are_flats: questions?.q_units_are_flats || '',
      q_two_thirds_leasehold_over_21_years: questions?.q_two_thirds_leasehold_over_21_years || '',
      q_at_least_50_percent_residential: questions?.q_at_least_50_percent_residential || ''
    }

    mutation.mutate(payload)
  }

  const handleNext = () => handleSubmit(handleFormSubmit)()
  const handleBackStep = () => router.push('/five')

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>RMC Onboarding</h1>
      <div className='flex items-center justify-center p-4 bg-white mt-8 mb-20'>
        <div className='p-4 rounded-lg w-full '>
          <div className=''>
            <Box component='form'>
              <Typography
                variant='h6'
                sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1', mb: 10 }}
              >
                Setup An RTM
              </Typography>

              <Grid container spacing={6}>
                {rmtFormInputs?.map(field => (
                  <Grid item xs={12} md={4} key={field?.name}>
                    <FormInput
                      name={field?.name as keyof RtmFormData}
                      control={control}
                      label={field?.label}
                      type={field?.type}
                      disabled={isSubmitting || mutation.isPending}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <div className='flex justify-between gap-2 items-center mt-40'>
              <CustomButton
                onClick={handleBackStep}
                startIcon={<i className='ri-arrow-left-line'></i>}
                variant='outlined'
              >
                Back
              </CustomButton>
              <CustomButton
                endIcon={<i className='ri-arrow-right-line'></i>}
                onClick={handleNext}
                disabled={isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? 'Submitting...' : 'Submit'}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OnboardingRtmForm
