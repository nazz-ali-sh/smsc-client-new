'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'

const OnboardingLeaseholderType = () => {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [value, setValue] = useState<string | null>(null)

  const handleNavigate = () => {
    router.push('/rmc-onboarding-buildings')
  }

  const leaseholderTypes = [
    { title: 'Converted House', image: '/svgs/house.svg' },
    { title: 'Purpose built Flat', image: '/svgs/flat.svg' },
    { title: 'Mixed Development', image: '/svgs/development.svg' },
    { title: 'Others', image: '/svgs/settings.svg' }
  ]

  return (
    <div className='flex flex-col items-center pt-10 '>
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
          {leaseholderTypes.map(({ title, image }) => (
            <div
              key={title}
              onClick={() => {
                setSelected(title)

                if (title !== 'Others') {
                  handleNavigate()
                }
              }}
              className={`group flex flex-col items-center p-6 shadow-sm rounded-md cursor-pointer h-[318px] justify-between transition-all duration-300
                w-full xl:w-[280px]
                ${selected === title ? 'bg-[#D7F2FB] border border-[#35C0ED]' : 'bg-[#F3FCFE] border border-blue-100 hover:bg-[#D7F2FB]'}`}
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
            placeholder='Others'
            value={value}
            onChange={e => setValue(e.target.value)}
            sx={{
              paddingRight: '13px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                '&.Mui-focused fieldset': {
                  borderColor: '#35C0ED'
                }
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
              onClick={handleNavigate}
              disabled={!selected}
              sx={{ fontSize: '16px', fontWeight: 700 }}
              endIcon={<i className='ri-arrow-right-line'></i>}
            >
              Confirm
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingLeaseholderType
