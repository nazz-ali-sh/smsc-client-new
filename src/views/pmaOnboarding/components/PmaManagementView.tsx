'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Grid } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import FormInput from '@/components/form-components/FormInput'
import { managementFeeSchema } from '@/schemas/validation-schemas'
import {
  submitPmaManagementFeeJson,
  type PmaManagementFeePayload
} from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { usePmaOnboardingData } from '@/hooks/usePmaOnboardingData'
import { PMA_ROUTES } from '@/constants'

type ManagementFeeData = {
  minimumFeePerUnit: string
  maximumFeePerUnit: string
}

export default function PmaManagementView() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: onboardingData } = usePmaOnboardingData()

  const { control, handleSubmit, reset } = useForm<ManagementFeeData>({
    resolver: valibotResolver(managementFeeSchema),
    defaultValues: {
      minimumFeePerUnit: '',
      maximumFeePerUnit: ''
    },
    mode: 'onChange'
  })

  const mutation = useMutation({
    mutationFn: submitPmaManagementFeeJson,
    onSuccess: () => {
      router.push(PMA_ROUTES.COMPANY_DETAILS)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save preferences. Please try again.'

      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  })

  const onSubmit = (data: ManagementFeeData) => {
    if (isSubmitting || mutation.isPending) return

    setIsSubmitting(true)

    const payload: PmaManagementFeePayload = {
      step: 7,
      min_fee_per_unit: data.minimumFeePerUnit ? parseInt(data.minimumFeePerUnit) : 0,
      max_fee_per_unit: data.maximumFeePerUnit ? parseInt(data.maximumFeePerUnit) : 0
    }

    mutation.mutate(payload)
  }

  const handleNext = () => {
    handleSubmit(onSubmit)()
  }

  const handleBack = () => {
    router.push(PMA_ROUTES.EMAIL_NOTIFICATION)
  }

  const handleSkip = () => {
    router.push(PMA_ROUTES.COMPANY_DETAILS)
  }

  React.useEffect(() => {
    const step7 = onboardingData?.data?.step_7

    if (!step7) return

    reset({
      minimumFeePerUnit: step7?.min_fee_per_unit != null ? String(step7?.min_fee_per_unit) : '',
      maximumFeePerUnit: step7?.max_fee_per_unit != null ? String(step7.max_fee_per_unit) : ''
    })
  }, [onboardingData, reset])

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>PMA Sign Up</h1>
      <div className='flex items-center justify-center p-4 bg-white mt-8 mb-20'>
        <div className='p-4 rounded-lg w-full'>
          <form>
            <h2 className='text-2xl font-medium text-[#262B43E5]'>Management Fee Range (SMSC Internal Use Only)</h2>

            <p className='mt-6 font-normal text-base leading-6 text-[#696969]'>
              Please enter your typical minimum and maximum management fee per unit (including VAT). This information
              is not shared with RMCs. It is collected by Save My Service Charge to support future platform development
              and to help build accurate regional industry benchmarks.
            </p>
            <p className='mt-6 mb-12 font-normal text-base leading-6 text-[#696969]'>
              Providing this information helps us better match your company with the most suitable tenders over time,
              but it does not affect your visibility or ranking with RMCs.
            </p>

            <div className='mb-8'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='minimumFeePerUnit'
                    control={control}
                    label='Minimum Fee per Unit (inc VAT)'
                    type='number'
                    placeholder='Minimum Fee per Unit (100-900)'
                    InputProps={{
                      startAdornment: <span style={{ marginRight: 4 }}>£</span>
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormInput
                    name='maximumFeePerUnit'
                    control={control}
                    label='Maximum Fee per Unit (inc VAT)'
                    type='number'
                    placeholder='Maximum Fee per Unit (100-900)'
                    InputProps={{
                      startAdornment: <span style={{ marginRight: 4 }}>£</span>
                    }}
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
                  isLoading={isSubmitting || mutation.isPending}
                >
                  {isSubmitting || mutation.isPending ? 'Processing...' : 'Next'}
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
