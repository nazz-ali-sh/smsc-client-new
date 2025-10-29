'use client'
import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import { clearRtmNonDirectorData, setRtmSetup } from '@/redux-store/slices/rtmNonDirectorSlice'
import { rtmSetupOptions } from '@/constants'

const OnboardingResidentRtm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { rtmSetup } = useSelector((state: any) => state?.rtmNonDirector)

  const handleCardClick = (value: string) => {
    if (value === 'no') {
      dispatch(clearRtmNonDirectorData())
      router.push('/onboarding')
    } else {
      dispatch(setRtmSetup(value))
      router.push('/questions')
    }
  }

  const handleBack = () => {
    dispatch(clearRtmNonDirectorData())
    router.push('/onboarding')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full  mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className=' mb-6'
        >
          Setup An RTM
        </Typography>

        <div className='flex justify-center py-6'>
          <div className='grid  sm:grid-cols-1 md:grid-cols-2 gap-16 pb-10'>
            {rtmSetupOptions.map(option => (
              <div
                key={option.value}
                onClick={() => handleCardClick(option.value)}
                className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer w-[280px] h-[318px] justify-between transition-all duration-300 hover:bg-[#D7F2FB] ${
                  rtmSetup === option.value && option.value === 'yes'
                    ? 'bg-[#D7F2FB] border-2 border-[#35C0ED]'
                    : 'bg-[#F3FCFE] border border-blue-100'
                }`}
              >
                <div className='flex items-center justify-center flex-grow'>
                  <div className='transition-transform duration-300 group-hover:scale-125'>
                    <Image
                      src={option.image}
                      alt={option.title}
                      width={150}
                      height={150}
                      className={option.value === 'yes' ? 'mb-4' : ''}
                    />
                  </div>
                </div>
                <Typography
                  variant='body1'
                  sx={{
                    color: 'customColors.gray10',
                    fontSize: '15px',
                    fontWeight: 500,
                    paddingTop: option.value === 'yes' ? '14px' : '0'
                  }}
                  className='text-center'
                >
                  {option.title}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-start mt-8'>
          <CustomButton onClick={handleBack} startIcon={<i className='ri-arrow-left-line'></i>} variant='outlined'>
            Back
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingResidentRtm
