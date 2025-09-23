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
import CommonModal from '@/common/CommonModal'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import FormInput from '@/components/form-components/FormInput'
import { budgetSchema } from '@/schemas/validation-schemas'
import {
  submitRmcOnboardingBudget,
  type RmcOnboardingBudgetPayload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import { budgetFields } from '@/constants'

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

  const calculateTotal = (data: BudgetFormData): number => {
    const values = [
      parseFloat(data?.managing_fee) || 0,
      parseFloat(data?.accounting_fee) || 0,
      parseFloat(data?.cosec_fee) || 0,
      parseFloat(data?.out_of_hours_fee) || 0,
      parseFloat(data?.emergency_fee) || 0,
      parseFloat(data?.fire_door_fee) || 0,
      parseFloat(data?.anti_money_fee) || 0
    ]

    return values?.reduce((sum, value) => sum + value, 0)
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    })?.format(value)
  }

  const getModalBudgetSummary = () => {
    if (!budgetData) return []

    return budgetFields
      ?.map((field, index) => ({
        sr: String(index + 1).padStart(2, '0'),
        fee: field?.placeholder,
        amount: parseFloat(budgetData[field?.name as keyof BudgetFormData] as string) || 0
      }))
      ?.filter(item => item?.amount > 0)
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
          Add Your Service Charge Budget
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className='mb-6'>
          Including your block’s service charge budget is optional, but highly recommended. Tenders that include budget
          information typically receive more detailed and tailored replies from Managing Agents. If you'd prefer not to
          upload it, you can skip this step but please note: once your tender goes live, you won’t be able to add budget
          details Later.The fees you enter for each fee type will be applied to the full block
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-10'>
            {budgetFields?.map(({ name, placeholder }) => (
              <FormInput key={name} name={name} control={control} placeholder={placeholder} type='text' />
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

      {showModal && budgetData && (
        <CommonModal
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          header='Thank You for Providing Your Budget'
          maxWidth='md'
          fullWidth
        >
          <div className='p-6'>
            <div className='mb-6 space-y-3'>
              <p className='text-[#696969] text-base font-normal'>
                Including this information gives Managing Agents a clearer picture of your block and helps you receive
                more accurate, competitive quotes.
              </p>
              <p className='text-[#696969] text-base font-normal'>
                Before continuing, please double-check that the figures are correct. Once you confirm, this step is
                locked and can't be changed after your tender goes live.
              </p>
            </div>

            <div className='bg-white border border-gray-200 rounded-lg overflow-hidden mb-6'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <div className='grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700'>
                  <div className='col-span-2'>Sr#</div>
                  <div className='col-span-6'>Fee</div>
                  <div className='col-span-4 text-right'>Per Block</div>
                </div>
              </div>

              <div className='divide-y divide-gray-200'>
                {getModalBudgetSummary()?.map((item, index) => (
                  <div key={index} className='px-4 py-3'>
                    <div className='grid grid-cols-12 gap-4 text-sm'>
                      <div className='col-span-2 text-gray-600'>{item?.sr}</div>
                      <div className='col-span-6 text-gray-800'>{item?.fee}</div>
                      <div className='col-span-4 text-right font-medium text-gray-800'>
                        {formatCurrency(item?.amount)}
                      </div>
                    </div>
                  </div>
                ))}

                <div className='px-4 py-3 bg-gray-50 border-t-2 border-gray-300'>
                  <div className='grid grid-cols-12 gap-4 text-sm font-semibold'>
                    <div className='col-span-2'></div>
                    <div className='col-span-6 text-gray-800'>TOTAL</div>
                    <div className='col-span-4 text-right text-gray-800'>
                      {budgetData ? formatCurrency(calculateTotal(budgetData)) : '£0.00'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between gap-4'>
              <CustomButton variant='outlined' onClick={handleModalEdit}>
                Back To Edit
              </CustomButton>

              <CustomButton
                onClick={handleModalConfirm}
                disabled={mutation.isPending}
                endIcon={<i className='ri-arrow-right-line'></i>}
              >
                {mutation.isPending ? 'Confirming...' : 'Confirm'}
              </CustomButton>
            </div>
          </div>
        </CommonModal>
      )}

      {showSkipModal && (
        <CommonModal
          isOpen={showSkipModal}
          handleClose={() => setShowSkipModal(false)}
          header='Are You Sure You Want to Skip This Step?'
          maxWidth='md'
          fullWidth
        >
          <div className='p-6'>
            <div className='mb-6'>
              <p className='text-[#696969] text-base font-normal leading-relaxed'>
                Uploading your service charge budget gives Managing Agents the context they need to provide accurate,
                tailored quotes. Without it, your tender may receive fewer replies — and those that do come in may be
                vague or overpriced. We strongly recommend adding your budget to get the best results. Once your tender
                is live, you won't be able to upload it later.
              </p>
            </div>

            <div className='flex justify-between gap-4'>
              <CustomButton variant='outlined' onClick={handleSkipBackToEdit}>
                Back To Edit
              </CustomButton>

              <CustomButton onClick={handleSkipAnyway}>Skip Anyway</CustomButton>
            </div>
          </div>
        </CommonModal>
      )}
    </div>
  )
}

export default OnboardingBudget
