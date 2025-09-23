'use client'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { Typography } from '@mui/material'

import {
  submitRmcLeaseholderType,
  type RmcLeaseholderTypePayload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import type { RootState } from '@/redux-store'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import { blockConditionTypes } from '@/constants'
import CustomButton from '@/common/CustomButton'

const OnbaordingBlocks = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const rmcData = useSelector((state: RootState) => state?.rmcOnboarding?.rmcData)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  useEffect(() => {
    if (onboardingData?.steps?.step_5?.block_condition) {
      const matchingCard = blockConditionTypes?.find(
        card => card?.value === onboardingData.steps.step_5.block_condition
      )

      if (matchingCard) {
        setSelected(matchingCard?.title)
      }
    }
  }, [onboardingData])

  const mutation = useMutation({
    mutationFn: submitRmcLeaseholderType,
    onSuccess: () => {
      invalidateCache()
      router.push('/rmc-onboarding-spaces')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit block condition. Please try again.')
    }
  })

  const handleBlockConditionSubmit = (blockCondition: string) => {
    if (!rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    const step5Data = onboardingData?.steps?.step_5 || {}

    const payload: RmcLeaseholderTypePayload = {
      step: 5,
      tender_onboarding_id: rmcData?.tender_onboarding_id,
      leasehold_type: step5Data?.leasehold_type || '',
      building_height: step5Data?.building_height || '',
      block_condition: blockCondition,
      outdoor_space: step5Data?.outdoor_space || ''
    }

    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push('/rmc-onboarding-buildings')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6 pb-10'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Block Condition
        </Typography>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-10 mt-10'>
          {blockConditionTypes?.map(({ title, value, image }) => (
            <div
              key={title}
              onClick={() => {
                setSelected(title)
                handleBlockConditionSubmit(value)
              }}
              className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer h-[318px] w-full xl:w-[280px] transition-all duration-300
                ${selected === title ? 'bg-[#D7F2FB] border border-[#35C0ED]' : 'bg-[#F3FCFE] border border-blue-100 hover:bg-[#D7F2FB]'} ${mutation.isPending ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className='flex flex-col justify-between items-center h-full w-full'>
                <div className='flex items-center justify-center flex-grow'>
                  <div className='transition-transform duration-300 group-hover:scale-125'>
                    <Image src={image} alt={title} width={150} height={150} className='mb-4' />
                  </div>
                </div>
                <Typography
                  variant='body1'
                  sx={{ color: 'customColors.gray10', fontSize: '16px', fontWeight: 500 }}
                  className='text-center leading-snug min-h-[40px] flex items-end'
                >
                  {title}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-start'>
          <CustomButton onClick={handleBack} variant='outlined' startIcon={<i className='ri-arrow-left-line'></i>}>
            Back
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnbaordingBlocks
