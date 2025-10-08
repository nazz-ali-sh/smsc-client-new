'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Box, Typography, } from '@mui/material'

import circular from '../../../../public/svgs/circular.svg'
import { BLUR_DATA_URLS } from '../../../utils/blurDataUrls'

interface ConfirmationRegistrationProps {
  onComplete: () => void
  firstName?: string
  lastName?: string
  email?: string
}

const ConfirmationRegistration: React.FC<ConfirmationRegistrationProps> = ({
  onComplete,
  firstName,
  lastName,
  email
}) => {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  const handleVerification = () => {
    router.replace('/rmc-onboarding-verification')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <Box sx={{ marginBottom: '2rem', position: 'relative', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       
        <Image 
          src={circular} 
          alt='confirmation' 
          width={200} 
          height={200} 
          priority 
          loading='eager'
          placeholder='blur'
          blurDataURL={BLUR_DATA_URLS.GENERIC}
          onLoad={() => setImageLoaded(true)}
          style={{ 
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </Box>

      <Typography
        variant='h4'
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'customColors.gray6'
        }}
      >
        Thank you for signing up with SMSC {firstName} {lastName}
      </Typography>

      <Typography
        variant='body1'
        sx={{
          fontSize: '16px',
          color: 'customColors.gray7'
        }}
      >
        Your registered email login address is {email}
      </Typography>

      <Typography
        variant='body1'
        sx={{
          fontSize: '16px',
          marginTop: 10,
          color: 'customColors.gray7'
        }}
      >
        Page will redirect you to verification screen,{' '}
        <span className='font-semibold text-[#35C0ED] cursor-pointer' onClick={handleVerification}>
          Click here
        </span>{' '}
        if not redirected within the 5 seconds
      </Typography>
    </Box>
  )
}

export default ConfirmationRegistration
