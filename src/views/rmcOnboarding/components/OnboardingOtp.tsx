'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { TextField, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'

export default function OnboardingOtp() {
  const router = useRouter()

  const [code, setCode] = useState(['', '', '', '', '', ''])

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = [...code]

    newCode[index] = e.target.value.slice(0, 1)
    setCode(newCode)

    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)

      nextInput?.focus()
    }
  }

  const handleNavigate = () => {
    router.push('/rmc-onboarding-postcode')
  }

  return (
    <>
      <h1 className='text-[48px] font-bold text-[#262B43E5] text-center mt-6 mb-4'>RMC Onboarding</h1>

      <div className=' bg-white flex items-center justify-center p-2 '>
        <div className='px-3 rounded-lg w-full max-w-7xl pb-12'>
          <Typography
            variant='h6'
            sx={{ fontSize: '24px', fontWeight: 500, color: 'customColors.darkGray1' }}
            className='mt-10 mb-6'
          >
            Verification
          </Typography>{' '}
          <div className=' mb-6 mt-20'>
            <Typography variant='body1' color='textSecondary' className='mb-2'>
              Verify Your Identity
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Enter 6-digit verification code we've sent you
            </Typography>
          </div>
          <div className='flex justify-center gap-1 mb-6'>
            {code.map((digit, index) => (
              <TextField
                key={index}
                id={`code-${index}`}
                name={`code-${index}`}
                value={digit}
                onChange={handleChange(index)}
                variant='outlined'
                inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '2px', borderRadius: '2px' } }}
                required
              />
            ))}
          </div>
          <div className=' mb-4'>
            <Typography variant='body2' color='textSecondary'>
              Didn't receive it? You can resend in 22s or switch verification method.
            </Typography>
          </div>
          <div className='text-center mb-6 mt-10'>
            <CustomButton sx={{ width: '300px', fontSize: '14px', borderRadius: '4px' }} onClick={handleNavigate}>
              Resend Code
            </CustomButton>
          </div>
          <Typography variant='body2' color='textSecondary' className='text-center'>
            If you're having trouble receiving the code, please check your spam folder or contact support.
          </Typography>
        </div>
      </div>
    </>
  )
}
