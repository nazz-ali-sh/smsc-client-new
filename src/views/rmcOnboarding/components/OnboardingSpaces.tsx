'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Typography } from '@mui/material'

const OnboardingSpaces = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  const handleNavigate = () => {
    router.push('/rmc-onboarding-priorities')
  }

  const leaseholderTypes = [
    { title: 'Large Shared Space', image: '/svgs/space.svg' },
    { title: 'Some', image: '/svgs/some.svg' },
    { title: 'None', image: '/svgs/none.svg' }
  ]

  return (
    <div className='flex flex-col items-center pt-10'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] '>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6 pb-10'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Outdoor Space
        </Typography>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center pb-10 mt-10 mx-32'>
          {leaseholderTypes.map(({ title, image }) => (
            <div
              key={title}
              onClick={() => {
                setSelected(title)
                handleNavigate()
              }}
              className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer h-[318px] w-[280px] transition-all duration-300
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

export default OnboardingSpaces
