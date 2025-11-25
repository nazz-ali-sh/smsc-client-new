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
import CommonModal from '@/common/CommonModal'

const OnboardingBudget = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showSkipModal, setShowSkipModal] = useState(false)
  const [shareYourBlockModalOpen, setShareYourBlockModalOpen] = useState(false)
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
      parseFloat(watchedValues?.managing_fee ?? '0') || 0,
      parseFloat(watchedValues?.accounting_fee ?? '0') || 0,
      parseFloat(watchedValues?.cosec_fee ?? '0') || 0,
      parseFloat(watchedValues?.out_of_hours_fee ?? '0') || 0,
      parseFloat(watchedValues?.emergency_fee ?? '0') || 0,
      parseFloat(watchedValues?.fire_door_fee ?? '0') || 0,
      parseFloat(watchedValues?.anti_money_fee ?? '0') || 0
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
    router.push('/leaseholder')
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
      managing_fee: parseFloat(budgetData?.managing_fee ?? '0'),
      accounting_fee: parseFloat(budgetData?.accounting_fee ?? '0'),
      cosec_fee: parseFloat(budgetData?.cosec_fee ?? '0'),
      out_of_hours_fee: parseFloat(budgetData?.out_of_hours_fee ?? '0'),
      emergency_fee: parseFloat(budgetData?.emergency_fee ?? '0'),
      fire_door_fee: parseFloat(budgetData?.fire_door_fee ?? '0'),
      anti_money_fee: parseFloat(budgetData?.anti_money_fee ?? '0'),
      step: 4,
      tender_onboarding_id: onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id
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
    router.push('/details')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Sign Up</h1>
      <div className='bg-white p-8 pt-10 w-full  mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6 flex'
        >
          Share Your Block’s Fixed Costs (Optional)
          <i
            className='ri-information-line cursor-pointer text-black transition-colors m-1'
            onClick={() => setShareYourBlockModalOpen(true)}
          ></i>
        </Typography>

        <Typography
          sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray', whiteSpace: 'pre-line' }}
          className='mb-6'
        >
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
                  maxLength: 8,
                  pattern: '[0-9]*\\.?[0-9]*',
                  inputMode: 'decimal'
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
              <CustomButton variant='outlined' onClick={handleSkipScreen}>
                Skip This Step
              </CustomButton>
              <CustomButton endIcon={<i className='ri-arrow-right-line'></i>} variant='contained' type='submit'>
                Confirm
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
        isLoading={mutation.isPending}
      />

      <CommonModal
        isOpen={shareYourBlockModalOpen}
        handleClose={() => setShareYourBlockModalOpen(false)}
        header='Why We Only Compare Fixed Costs'
        maxWidth='md'
      >
        <div className='space-y-4'>
          <Typography variant='body2' className='text-[#696969] mt-3 leading-[22px] text-[13px]'>
            Save My Service Charge compares fixed cost elements of your service charge budget — the standard fees every
            block pays, such as management, accounting, and company secretarial fees.
          </Typography>
          <div>
            <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px] text-[13px]'>
              These are the most reliable figures for comparing value between managing agents. Variable costs (for
              example, cleaning, gardening, and energy) usually transfer across to your new managing agent and can be
              reviewed or re-tendered later if you wish to reduce them.
            </Typography>
          </div>
          <div className='mt-6'>
            <Typography variant='body2' className='text-[#696969] leading-[22px] text-[13px]'>
              By sharing your fixed costs now, you’ll enable a clearer and fairer comparison during the tender process.
            </Typography>
          </div>
        </div>
      </CommonModal>
    </div>
  )
}

export default OnboardingBudget
