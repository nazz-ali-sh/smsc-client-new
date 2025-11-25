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
import { pmaOnboardingSchema } from '@/schemas/validation-schemas'
import {
  type PmaOnboardingStep1Payload,
  type PmaOnboardingFormData,
  addCompanyAccount
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { setPmaUserId } from '@/redux-store/slices/pmaOnboardingSlice'
import ConfirmationRegistration from '@/common/ConfirmationRegistration'
import { PMA_ROUTES } from '@/constants'

export default function OnboardingPmaDirector() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userData, setUserData] = useState<{ firstName: string; lastName: string; email: string } | null>(null)

  const { control, handleSubmit } = useForm<PmaOnboardingFormData>({
    resolver: valibotResolver(pmaOnboardingSchema as any),
    defaultValues: {
      companyName: '',
      website: '',
      landline: '',
      fullName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: addCompanyAccount,
    onSuccess: data => {
      if (data?.data?.data) {
        const pmaUserId = data?.data?.data?.user_id

        dispatch(setPmaUserId(pmaUserId))
      }

      setShowConfirmation(true)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const handleFormSubmit = (data: PmaOnboardingFormData) => {
    if (isSubmitting || mutation.isPending) return

    setIsSubmitting(true)

    setUserData({
      firstName: data.fullName,
      lastName: '',
      email: data.email
    })

    const payload: PmaOnboardingStep1Payload = {
      company_name: data.companyName,
      website: data.website,
      landline: data.landline,
      name: data.fullName,
      mobile_number: data.mobileNumber,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword
    }

    mutation.mutate(payload)
  }

  const handleNext = () => {
    handleSubmit(handleFormSubmit)()
  }

  const handleConfirmationComplete = () => {
    router.replace(PMA_ROUTES.OTP_VERIFICATION)
  }

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8 '>PMA Sign Up</h1>
      <div className='flex items-center justify-center p-4 bg-white mt-8 mb-20'>
        {showConfirmation ? (
          <ConfirmationRegistration
            onComplete={handleConfirmationComplete}
            firstName={userData?.firstName}
            lastName={userData?.lastName}
            email={userData?.email}
            portal='pma_portal'
          />
        ) : (
          <div className='p-4 rounded-lg w-full '>
            <div>
              <Box component='form'>
                <Typography variant='h6' sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}>
                  Company & Account Holder Information
                </Typography>

                <Typography
                  sx={{
                    marginTop: '24px',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '31px',
                    color: '#696969',
                    marginBottom: '78px'
                  }}
                >
                  Help us get to know your company better. We'll use this information to create your profile and connect
                  you with the right opportunities.
                </Typography>

                <Grid container spacing={6}>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='companyName'
                      control={control}
                      label='Company Name'
                      type='text'
                      disabled={mutation.isPending}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='fullName'
                      control={control}
                      label='Full Name'
                      type='text'
                      disabled={mutation.isPending}
                      inputProps={{
                        maxLength: 15,
                        inputMode: 'text' as const,
                        onInput: (e: any) => {
                          e.target.value = e.target.value?.replace(/[^a-zA-Z\s'-]/g, '')
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='mobileNumber'
                      control={control}
                      label='Mobile'
                      type='tel'
                      disabled={mutation.isPending}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='email'
                      control={control}
                      label='Email'
                      type='email'
                      disabled={mutation.isPending}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='password'
                      control={control}
                      label='Password'
                      type='password'
                      disabled={mutation.isPending}
                      showPasswordToggle={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='confirmPassword'
                      control={control}
                      label='Confirm Password'
                      type='password'
                      disabled={mutation.isPending}
                      showPasswordToggle={true}
                    />
                  </Grid>
                </Grid>

                <div className='flex gap-1 items-center mt-2'>
                  <span className='size-[6px] rounded-full bg-[#696969]'></span>

                  <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px' }}>
                    This email will become the administrator login for your PMA account. You can add secondary users and
                    branch users from your portal.
                  </Typography>
                </div>

                <Typography
                  variant='h6'
                  sx={{
                    fontSize: '24px',
                    fontWeight: 500,
                    color: 'customColors.darkGray1',
                    marginTop: '54px',
                    marginBottom: '24px'
                  }}
                >
                  Contact Details
                </Typography>

                <Grid container spacing={6}>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='website'
                      control={control}
                      label='Company Website'
                      type='text'
                      disabled={mutation.isPending}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormInput
                      name='landline'
                      control={control}
                      label='Company Landline Number'
                      type='tel'
                      disabled={mutation.isPending}
                    />
                  </Grid>
                </Grid>
              </Box>

              <div className='flex justify-end gap-2 items-center mt-40'>
                <CustomButton
                  endIcon={<i className='ri-arrow-right-line'></i>}
                  onClick={handleNext}
                  isLoading={isSubmitting || mutation.isPending}
                  disabled={isSubmitting || mutation.isPending}
                >
                  {isSubmitting || mutation.isPending ? 'Submitting...' : 'Next'}
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
