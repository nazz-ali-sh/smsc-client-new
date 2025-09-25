'use client'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import {
  submitRmcLeaseholderType,
  type RmcLeaseholderTypePayload
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import type { RootState } from '@/redux-store'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'
import { leaseholderTypes } from '@/constants'

const OnboardingLeaseholderType = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [value, setValue] = useState<string | null>(null)

  const rmcData = useSelector((state: RootState) => state?.rmcOnboarding?.rmcData)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  useEffect(() => {
    if (onboardingData?.steps?.step_5) {
      const step5Data = onboardingData?.steps?.step_5

      if (step5Data?.leasehold_type && step5Data?.leasehold_type !== '') {
        const matchingCard = leaseholderTypes?.find(card => card?.value === step5Data?.leasehold_type)

        if (matchingCard) {
          setSelected(matchingCard?.title)
          setValue(null)
        } else {
          setSelected('Others')
          setValue(step5Data?.leasehold_type)
        }
      }
    }
  }, [onboardingData])

  const mutation = useMutation({
    mutationFn: submitRmcLeaseholderType,
    onSuccess: () => {
      invalidateCache()
      router.push('/rmc-onboarding-buildings')
    },
    onError: (error: any) => {
      let errorMessage = 'Failed to submit leaseholder type. Please try again.'

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.response?.status === 400) {
        errorMessage = 'Please check your selection and try again.'
      } else if (error?.response?.status === 401) {
        errorMessage = 'Unauthorized. Please login again.'
      }

      toast.error(errorMessage)
    }
  })

  const handleLeaseholderTypeSubmit = (leaseholdType: string, customValue?: string) => {
    if (!rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    const step5Data = onboardingData?.steps?.step_5 || {}

    const payload: RmcLeaseholderTypePayload = {
      step: 5,
      tender_onboarding_id: rmcData?.tender_onboarding_id,
      leasehold_type: customValue || leaseholdType,
      building_height: step5Data?.building_height || '',
      block_condition: step5Data?.block_condition || '',
      outdoor_space: step5Data?.outdoor_space || ''
    }

    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push('/rmc-onboarding-budget')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5]'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6 pb-10'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Leaseholder type
        </Typography>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-10 mt-10'>
          {leaseholderTypes?.map(({ title, image, value }) => (
            <div
              key={title}
              onClick={() => {
                setSelected(title)

                if (title !== 'Others') {
                  setValue(null)
                  handleLeaseholderTypeSubmit(value)
                }
              }}
              className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer h-[318px] justify-between transition-all duration-300
                w-full xl:w-[280px]
                ${selected === title ? 'bg-[#D7F2FB] border border-[#35C0ED]' : 'bg-[#F3FCFE] border border-blue-100 hover:bg-[#D7F2FB]'}
                ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className='flex items-center justify-center flex-grow'>
                <div className='transition-transform duration-300 group-hover:scale-125'>
                  <Image src={image} alt={title} width={150} height={150} className='mb-4' />
                </div>
              </div>
              <Typography
                variant='body1'
                sx={{ color: 'customColors.gray10', fontSize: '15px', fontWeight: 500 }}
                className='text-center'
              >
                {title}
              </Typography>
            </div>
          ))}
        </div>
        {selected === 'Others' && (
          <TextField
            fullWidth
            label='Others'
            value={value}
            onChange={e => setValue(e.target.value)}
            sx={{
              paddingRight: '13px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                color: '#6C6C6C',
                fontSize: '14px',
                '&.Mui-focused fieldset': {
                  borderColor: '#35C0ED',
                  border: '1px solid #35C0ED'
                }
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: '#35C0ED'
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'customColors.textGray',
                opacity: 1
              }
            }}
          />
        )}
        {selected === 'Others' && (
          <div className='pb-3 pt-12 flex justify-end mr-3'>
            <CustomButton
              onClick={() => {
                if (!value || value?.trim() === '') {
                  toast.error('Please enter a value for "Others" option')

                  return
                }

                handleLeaseholderTypeSubmit('', value || undefined)
              }}
              disabled={!selected || mutation.isPending}
              sx={{ fontSize: '16px', fontWeight: 700 }}
              endIcon={<i className='ri-arrow-right-line'></i>}
            >
              {mutation.isPending ? 'Submitting...' : 'Confirm'}
            </CustomButton>
          </div>
        )}
        <div className='flex justify-start'>
          <CustomButton onClick={handleBack} variant='outlined' startIcon={<i className='ri-arrow-left-line'></i>}>
            Back
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingLeaseholderType
