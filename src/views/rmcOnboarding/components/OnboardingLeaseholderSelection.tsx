'use client'
import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Typography } from '@mui/material'

const OnboardingLeaseholderSelection = () => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push('/director')
  }

  const handleRTM = () => {
    router.push('/resident')
  }

  return (
    <div className='flex flex-col items-center pt-10 mb-20 '>
      <h1 className='text-[48px] font-bold text-[#262B43E5]'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10  w-full mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className=' mb-6'
        >
          Confirm Leaseholder Status
        </Typography>

        <div className='flex justify-center py-6'>
          <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-16 pb-10'>
            <div
              onClick={handleCardClick}
              className='group flex flex-col items-center p-6 shadow-sm rounded-md bg-[#F3FCFE] border border-blue-100 cursor-pointer w-[280px] h-[318px] justify-between transition-all duration-300 hover:bg-[#D7F2FB]'
            >
              <div className='flex items-center justify-center flex-grow'>
                <div className='transition-transform duration-300 group-hover:scale-125'>
                  <Image src='/svgs/onboardingUser.svg' alt='Director' width={150} height={150} className='mb-4' />
                </div>
              </div>
              <Typography
                variant='body1'
                sx={{ color: 'customColors.gray10', fontSize: '15px', fontWeight: 500, paddingTop: '14px' }}
                className='text-center'
              >
                I am a Director of an RMC
              </Typography>
            </div>

            <div
              onClick={handleRTM}
              className='group flex flex-col items-center p-6 shadow-sm rounded-md bg-[#F3FCFE] border border-blue-100 cursor-pointer w-[280px] h-[318px] justify-between transition-all duration-300 hover:bg-[#D7F2FB]'
            >
              <div className='flex items-center justify-center flex-grow'>
                <div className='transition-transform duration-300 group-hover:scale-125'>
                  <Image src='/svgs/onboardingNonUser.svg' alt='Resident' width={150} height={150} />
                </div>
              </div>
              <Typography sx={{ color: 'customColors.gray10', fontSize: '15px', fontWeight: 500, padding: 0 }}>
                I am not a Director of an RMC
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingLeaseholderSelection
