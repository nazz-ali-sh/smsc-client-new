'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Typography } from '@mui/material'

const OnboardingBuildings = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  const handleNavigate = () => {
    router.push('/rmc-onboarding-blocks')
  }

  const leaseholderTypes = [
    { title: 'Below 11m Typically 3 floors or less', image: '/svgs/development.svg' },
    { title: '11m - 18m Typically 4 to 5 floors ', image: '/svgs/fourFloor.svg' },
    { title: 'Above 18m Typically 6 floors or more ', image: '/svgs/sixFloor.svg' },
    { title: 'Don’t Know', image: '/svgs/settings2.svg' }
  ]

  return (
    <div className='flex flex-col items-center pt-20 px-4'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] mb-8'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-16 pb-20'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Building Height
        </Typography>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-6 mt-16'>
          {leaseholderTypes.map(({ title, image }) => (
            <div
              key={title}
              onClick={() => {
                setSelected(title)
                handleNavigate()
              }}
              className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer h-[318px] w-full xl:w-[280px] transition-all duration-300
                ${selected === title ? 'bg-[#D7F2FB] border border-[#35C0ED]' : 'bg-[#F3FCFE] border border-blue-100 hover:bg-[#D7F2FB]'}`}
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
      </div>
    </div>
  )
}

export default OnboardingBuildings
