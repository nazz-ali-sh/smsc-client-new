'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'

export default function OnboardingForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    console.log(formData)
  }

  const handleNext = () => {
    router.push('/rmc-onboarding-verification')
  }

  const buttonStyles = { fontWeight: 700, fontSize: '14px' }

  return (
    <>
      <h1 className='text-[48px] text-center font-bold text-[#262B43E5] mt-8'>RMC Onboarding</h1>
      <div className='flex items-center justify-center p-4  bg-white mt-8'>
        <div className='p-4 rounded-lg w-full max-w-7xl'>
          <Typography
            variant='h6'
            sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
            className=' mb-6'
          >
            Director Of RMC
          </Typography>{' '}
          <form onSubmit={handleSubmit} className='pt-16'>
            <div className=''>
              <div className='grid grid-cols-3 gap-6 mb-7'>
                <TextField
                  label='Full Name'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  label='Email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  label='Phone Number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>

              <div className='grid grid-cols-3 gap-6 mb-6'>
                <TextField
                  label='Password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  label='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
            </div>
            <div className='flex justify-end gap-2 items-center mt-40'>
              <CustomButton sx={buttonStyles}>Back</CustomButton>
              <CustomButton sx={buttonStyles} onClick={handleNext}>
                Next
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
