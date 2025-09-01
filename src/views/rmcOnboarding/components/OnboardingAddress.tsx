'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Typography, Select, MenuItem } from '@mui/material'

import CustomButton from '@/common/CustomButton'

const OnboardingAddress = () => {
  const router = useRouter()
  const [address, setAddress] = useState('')

  const addressOptions = ['123 Main Street', '456 Oak Avenue', '742 Evergreen Terrace']

  const handleNavigate = () => {
    router.push('/rmc-onboarding-details')
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
          Address
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className=' mb-6'>
          Please Select your address below. This allows us to identify and connect you with qualified managing agents
          who are local to your area and have a strong understanding of the regional market and its specific needs.
        </Typography>

        <div className='pb-14 mt-14'>
          <div className='flex gap-3 items-center'>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '18px', fontWeight: 500 }}>
              Postcode:
            </Typography>
            <Typography sx={{ color: 'customColors.textGray', fontSize: '14px', fontWeight: 300 }}>SWA 1AA</Typography>
          </div>
          <CustomButton
            sx={{ fontSize: '16px', marginTop: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            Change Postcode
          </CustomButton>
        </div>

        <div className=''>
          <div className='grid grid-cols-1 pb-10'>
            <Select
              fullWidth
              displayEmpty
              value={address}
              onChange={e => setAddress(e.target.value)}
              sx={{
                borderRadius: '6px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#35C0ED'
                },
                '& .MuiSelect-select': {
                  color: address ? 'inherit' : 'customColors.textGray'
                }
              }}
            >
              <MenuItem value='' disabled>
                Select Address
              </MenuItem>
              {addressOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className='pb-3 flex justify-end'>
          <CustomButton
            onClick={handleNavigate}
            sx={{ fontSize: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            Choose This Address
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingAddress
