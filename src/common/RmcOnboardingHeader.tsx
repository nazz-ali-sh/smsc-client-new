'use client'

import React from 'react'

import Image from 'next/image'

import appLogo from '../../public/images/customImages/appLogo.png'

import CustomButton from './CustomButton'

const RmcOnboardingHeader = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Image src={appLogo} alt='nav Logo' />
        <div className='flex items-center gap-3'>
          <CustomButton
            sx={{
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            Contact Us
          </CustomButton>
        </div>
      </div>
    </>
  )
}

export default RmcOnboardingHeader
