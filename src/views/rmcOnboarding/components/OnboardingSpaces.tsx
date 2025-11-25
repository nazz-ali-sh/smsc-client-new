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
import { outdoorSpaceTypes } from '@/constants'
import CustomButton from '@/common/CustomButton'

const OnboardingSpaces = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const rmcData = useSelector((state: RootState) => state?.rmcOnboarding?.rmcData)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  useEffect(() => {
    if (onboardingData?.steps?.step_5?.outdoor_space) {
      const matchingCard = outdoorSpaceTypes?.find(card => card?.value === onboardingData.steps.step_5.outdoor_space)

      if (matchingCard) {
        setSelected(matchingCard?.title)
      }
    }
  }, [onboardingData])

  const mutation = useMutation({
    mutationFn: submitRmcLeaseholderType,
    onSuccess: () => {
      invalidateCache()
      router.push('/priorities')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit outdoor space. Please try again.')
    }
  })

  const handleOutdoorSpaceSubmit = (outdoorSpace: string) => {
    if (!onboardingData?.onboarding_id && !rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    const step5Data = onboardingData?.steps?.step_5 || {}

    const payload: RmcLeaseholderTypePayload = {
      step: 5,
      tender_onboarding_id: onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id,
      leasehold_type: step5Data?.leasehold_type || '',
      building_height: step5Data?.building_height || '',
      block_condition: step5Data?.block_condition || '',
      outdoor_space: outdoorSpace
    }

    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push('/blocks')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Sign Up</h1>
      <div className='bg-white p-8 pt-10 w-full mt-6 pb-10'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Outdoor Space
        </Typography>

        <div className='grid  xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-center place-items-center pb-10 mt-10 mx-32'>
          {outdoorSpaceTypes?.map(({ title, value, image }) => (
            <div
              key={title}
              onClick={() => {
                setSelected(title)
                handleOutdoorSpaceSubmit(value)
              }}
              className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer h-[318px] w-[280px] transition-all duration-300
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

export default OnboardingSpaces
