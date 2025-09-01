'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'

interface InputField {
  name: string
  placeholder: string
}

const inputFields: InputField[] = [
  { name: 'fullName', placeholder: 'Full Name' },
  { name: 'email', placeholder: 'Email' },
  { name: 'phoneNumber', placeholder: 'Phone Number' }
]

const OnboardingRtmForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: '',
    email: '',
    phoneNumber: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNavigate = () => {
    router.push('rmc-onboarding-questions')
  }

  return (
    <div className='flex flex-col items-center pt-10'>
      <h1 className='text-[48px] font-bold text-[#262B43E5]'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-6'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className=' mb-6'
        >
          Setup An RTM
        </Typography>

        <div className='py-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10'>
            {inputFields.map(field => (
              <TextField
                key={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                placeholder={field.placeholder}
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
            ))}
          </div>
        </div>
        <div className='flex justify-end gap-4 mt-44 pb-10'>
          <CustomButton sx={{ fontSize: '16px', fontWeight: 700 }} startIcon={<i className='ri-arrow-left-line'></i>}>
            Back
          </CustomButton>
          <CustomButton
            onClick={handleNavigate}
            sx={{ fontSize: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingRtmForm
