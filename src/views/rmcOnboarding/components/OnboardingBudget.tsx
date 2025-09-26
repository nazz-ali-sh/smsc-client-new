'use client'
import React, { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import CustomButton from '@/common/CustomButton'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import FormInput from '@/components/form-components/FormInput'
import BudgetConfirmationModal from './BudgetConfirmationModal'
import BudgetSkipModal from './BudgetSkipModal'
import { budgetSchema } from '@/schemas/validation-schemas'
import {
  submitRmcOnboardingBudget,
  type RmcOnboardingBudgetPayload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { budgetFields, budgetText } from '@/constants'

const OnboardingBudget = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showSkipModal, setShowSkipModal] = useState(false)
  const [budgetData, setBudgetData] = useState<BudgetFormData | null>(null)

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()
  const totalUnits = onboardingData?.steps?.step_3 || {}

  const existingBudgetData = useMemo(() => {
    return onboardingData?.steps?.step_4 || {}
  }, [onboardingData])

  const { control, handleSubmit, reset, watch } = useForm<BudgetFormData>({
    resolver: valibotResolver(budgetSchema),
    mode: 'onChange',
    defaultValues: {
      managing_fee: existingBudgetData?.managing_fee || '',
      accounting_fee: existingBudgetData?.accounting_fee || '',
      cosec_fee: existingBudgetData?.cosec_fee || '',
      out_of_hours_fee: existingBudgetData?.out_of_hours_fee || '',
      emergency_fee: existingBudgetData?.emergency_fee || '',
      fire_door_fee: existingBudgetData?.fire_door_fee || '',
      anti_money_fee: existingBudgetData?.anti_money_fee || ''
    }
  })

  const watchedValues = watch()

  const calculateCurrentTotal = (): number => {
    const values = [
      parseFloat(watchedValues?.managing_fee) || 0,
      parseFloat(watchedValues?.accounting_fee) || 0,
      parseFloat(watchedValues?.cosec_fee) || 0,
      parseFloat(watchedValues?.out_of_hours_fee) || 0,
      parseFloat(watchedValues?.emergency_fee) || 0,
      parseFloat(watchedValues?.fire_door_fee) || 0,
      parseFloat(watchedValues?.anti_money_fee) || 0
    ]

    return values?.reduce((sum, value) => sum + value, 0)
  }

  useEffect(() => {
    if (onboardingData && existingBudgetData) {
      reset({
        managing_fee: existingBudgetData?.managing_fee || '',
        accounting_fee: existingBudgetData?.accounting_fee || '',
        cosec_fee: existingBudgetData?.cosec_fee || '',
        out_of_hours_fee: existingBudgetData?.out_of_hours_fee || '',
        emergency_fee: existingBudgetData?.emergency_fee || '',
        fire_door_fee: existingBudgetData?.fire_door_fee || '',
        anti_money_fee: existingBudgetData?.anti_money_fee || ''
      })
    }
  }, [onboardingData, existingBudgetData, reset])

  const handleSkip = () => {
    router.push('/rmc-onboarding-leaseholder')
  }

  const mutation = useMutation({
    mutationFn: submitRmcOnboardingBudget,
    onSuccess: () => {
      invalidateCache()
      handleSkip()
    },
    onError: (error: any) => {
      let errorMessage = 'Failed to submit budget. Please try again.'

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.response?.status === 400) {
        errorMessage = 'Please check your input values and try again.'
      } else if (error?.response?.status === 401) {
        errorMessage = 'Unauthorized. Please login again.'
      }

      toast.error(errorMessage)
    }
  })

  const handleFormSubmit = (data: BudgetFormData) => {
    setBudgetData(data)
    setShowModal(true)
  }

  const handleModalConfirm = () => {
    if (!budgetData) return

    const payload: RmcOnboardingBudgetPayload = {
      managing_fee: parseFloat(budgetData?.managing_fee),
      accounting_fee: parseFloat(budgetData?.accounting_fee),
      cosec_fee: parseFloat(budgetData?.cosec_fee),
      out_of_hours_fee: parseFloat(budgetData?.out_of_hours_fee),
      emergency_fee: parseFloat(budgetData?.emergency_fee),
      fire_door_fee: parseFloat(budgetData?.fire_door_fee),
      anti_money_fee: parseFloat(budgetData?.anti_money_fee),
      step: 4,
      tender_onboarding_id: rmcData?.tender_onboarding_id
    }

    mutation.mutate(payload)
    setShowModal(false)
  }

  const handleModalEdit = () => {
    setShowModal(false)
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    })?.format(value)
  }

  const handleSkipScreen = () => {
    setShowSkipModal(true)
  }

  const handleSkipAnyway = () => {
    setShowSkipModal(false)

    const payload: RmcOnboardingBudgetPayload = {
      managing_fee: '',
      accounting_fee: '',
      cosec_fee: '',
      out_of_hours_fee: '',
      emergency_fee: '',
      fire_door_fee: '',
      anti_money_fee: '',
      step: 4,
      tender_onboarding_id: rmcData?.tender_onboarding_id
    }

    mutation.mutate(payload)
  }

  const handleSkipBackToEdit = () => {
    setShowSkipModal(false)
  }

  const handleBackScreen = () => {
    router.push('/rmc-onboarding-details')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Add Your Service Charge Budget (Optional)
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className='mb-6'>
          {budgetText}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-10'>
            {budgetFields?.map(({ name, label }) => (
              <FormInput
                key={name}
                name={name}
                control={control}
                label={label}
                type='text'
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                onInput={(e: any) => {
                  const value = parseFloat(e.target.value)

                  if (value > 9999) {
                    return
                  }
                }}
              />
            ))}
          </div>

          <div className='flex gap-3 items-center pt-8'>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '18px', fontWeight: 500 }}>
              Total for {totalUnits?.total_units} Units :
            </Typography>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '14px', fontWeight: 300 }}>
              {formatCurrency(calculateCurrentTotal())}
            </Typography>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <CustomButton
              onClick={handleBackScreen}
              variant='outlined'
              startIcon={<i className='ri-arrow-left-line'></i>}
            >
              Back
            </CustomButton>
            <div className='pb-3 pt-3 flex gap-4 justify-end '>
              <CustomButton variant='outlined' type='submit' disabled={mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Confirm'}
              </CustomButton>
              <CustomButton endIcon={<i className='ri-arrow-right-line'></i>} onClick={handleSkipScreen}>
                Skip This Step
              </CustomButton>
            </div>
          </div>
        </form>
      </div>

      <BudgetConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        budgetData={budgetData}
        onConfirm={handleModalConfirm}
        onEdit={handleModalEdit}
        isLoading={mutation.isPending}
      />

      <BudgetSkipModal
        isOpen={showSkipModal}
        onClose={() => setShowSkipModal(false)}
        onSkipAnyway={handleSkipAnyway}
        onBackToEdit={handleSkipBackToEdit}
      />
    </div>
  )
}

export default OnboardingBudget
