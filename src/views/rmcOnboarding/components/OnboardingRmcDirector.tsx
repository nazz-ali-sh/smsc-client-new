'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Typography, Grid, Box } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import { directorOfRMCSchema } from '@/schemas/validation-schemas'
import {
  submitRmcOnboardingStep1,
  type RmcOnboardingStep1Payload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { setRmcData } from '@/redux-store/slices/rmcOnboardingSlice'
import { rmcDirectorFormInputs } from '@/constants'

export default function OnboardingForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit } = useForm<DirectorOfRMCFormData>({
    resolver: valibotResolver(directorOfRMCSchema),
    defaultValues: {
      fullName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: submitRmcOnboardingStep1,
    onSuccess: data => {
      if (data?.data) {
        const rmcData = {
          user_id: data?.data?.user_id,
          onboarding_id: data?.data?.onboarding_id,
          verified: data?.data?.verified,
          status: data?.data?.status,
          current_step: data?.data?.current_step,
          next_step: data?.data?.next_step,
          token: data?.data?.token,
          is_completed: data?.data?.is_completed
        }

        dispatch(setRmcData(rmcData))

        router.replace('/rmc-onboarding-verification')
      }

      setIsSubmitting(false)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to submit form. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleFormSubmit = (data: DirectorOfRMCFormData) => {
    if (isSubmitting || mutation.isPending) {
      return
    }

    setIsSubmitting(true)

    const payload: RmcOnboardingStep1Payload = {
      name: `${data?.fullName} ${data?.lastName}`.trim(),
      email: data?.email,
      phone_no: data?.phoneNumber,
      password: data?.password,
      password_confirmation: data?.confirmPassword
    }

    mutation.mutate(payload)
  }

  const handleNext = () => {
    handleSubmit(handleFormSubmit)()
  }

  const handleBackStep = () => {
    router.push('/rmc-onboarding')
  }

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8 '>RMC Onboarding</h1>
      <div className='flex items-center justify-center p-4 bg-white mt-8 mb-20'>
        <div className='p-4 rounded-lg w-full max-w-7xl'>
          <div className='pt-16'>
            <Box component='form'>
              <Typography
                variant='h6'
                sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1', mb: 3 }}
              >
                Director Of RMC
              </Typography>

              <Grid container spacing={6}>
                {rmcDirectorFormInputs?.map(field => {
                  // Add specific input restrictions for first name and last name
                  const getInputProps = () => {
                    if (field.name === 'fullName' || field.name === 'lastName') {
                      return {
                        maxLength: 15,
                        inputMode: 'text' as const,
                        onInput: (e: any) => {
                          e.target.value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '')
                        }
                      }
                    }

                    
return {}
                  }

                  return (
                    <Grid item xs={12} md={4} key={field.name}>
                      <FormInput
                        name={field?.name as keyof DirectorOfRMCFormData}
                        control={control}
                        label={field?.label}
                        type={field?.type}
                        disabled={mutation.isPending}
                        showPasswordToggle={field.showPasswordToggle}
                        inputProps={getInputProps()}
                      />
                    </Grid>
                  )
                })}
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
                {isSubmitting || mutation.isPending ? 'Submitting...' : 'Next'}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
