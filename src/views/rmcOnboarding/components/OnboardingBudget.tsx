'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'

const OnboardingBudget = () => {
  const router = useRouter()

  const [budget, setBudget] = useState({
    managementFee: '',
    accountingFee: '',
    coSecFee: '',
    outOfHoursFee: '',
    emergencyLighting: '',
    fireDoor: '',
    amlChecks: ''
  })

  const handleChange = (key: keyof typeof budget, value: string) => {
    setBudget(prev => ({ ...prev, [key]: value }))
  }

  const handleNavigate = () => {
    router.push('/rmc-onboarding-leaseholder')
  }

  const fields = [
    { key: 'managementFee', label: 'Management Fee' },
    { key: 'accountingFee', label: 'Accounting Fee' },
    { key: 'coSecFee', label: 'CoSec Fee' },
    { key: 'outOfHoursFee', label: 'Out of Hours Fee' },
    { key: 'emergencyLighting', label: 'Emergency Lighting Tests' },
    { key: 'fireDoor', label: 'Fire Door Inspections' },
    { key: 'amlChecks', label: 'Anti Money Laundering Checks' }
  ] as const

  const textFieldSx = {
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
  }

  return (
    <div className='flex flex-col items-center pt-20 px-4'>
      <h1 className='text-[48px] font-bold text-[#262B43E5] mb-8'>RMC Onboarding</h1>
      <div className='bg-white p-8 pt-10 w-full max-w-7xl mt-16'>
        <Typography
          variant='h6'
          sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
          className='mb-6'
        >
          Add Your Service Charge Budget
        </Typography>

        <Typography sx={{ fontSize: '18px', fontWeight: 400, color: 'customColors.textGray' }} className='mb-6'>
          Including your block’s service charge budget is optional, but highly recommended. Tenders that include budget
          information typically receive more detailed and tailored replies from Managing Agents. If you'd prefer not to
          upload it, you can skip this step but please note: once your tender goes live, you won’t be able to add budget
          details Later.The fees you enter for each fee type will be applied to the full block
        </Typography>
        <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-20 '>
          {fields.map(({ key, label }) => (
            <TextField
              key={key}
              fullWidth
              placeholder={label}
              value={budget[key]}
              onChange={e => handleChange(key, e.target.value)}
              sx={textFieldSx}
            />
          ))}
        </div>
        <div className='flex gap-3 items-center pt-8'>
          <Typography sx={{ color: 'customColors.textGray', fontSize: '18px', fontWeight: 500 }}>Postcode:</Typography>
          <Typography sx={{ color: 'customColors.textGray', fontSize: '14px', fontWeight: 300 }}>SWA 1AA</Typography>
        </div>

        <div className='pb-3 pt-16 flex justify-end'>
          <CustomButton
            onClick={handleNavigate}
            sx={{ fontSize: '16px', fontWeight: 700 }}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            Confirm
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OnboardingBudget
