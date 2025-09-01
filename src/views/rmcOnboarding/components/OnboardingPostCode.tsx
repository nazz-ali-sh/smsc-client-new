'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'

const OnboardingPostCode = () => {
  const router = useRouter()
  const [postcode, setPostcode] = useState('')

  const handleNavigate = () => {
    router.push('/rmc-onboarding-address')
  }

  return (
    <div className='flex flex-col items-center pt-10'>
      <h1 className='text-[48px] font-bold text-[#262B43E5]'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Postcode
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className=' mb-6'>
          Please enter your postcode below. This allows us to identify and connect you with qualified managing agents
          who are local to your area and have a strong understanding of the regional market and its specific needs.
        </Typography>

        <div className='mt-20'>
          <div className='grid grid-cols-1 pb-20'>
            <TextField
              fullWidth
              placeholder='Enter Postcode'
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              sx={{
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
          </div>
        </div>
        <div className='pb-20'>
          <CustomButton
            onClick={handleNavigate}
            sx={{ fontSize: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            Find Address
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPostCode
