'use client'

import React from 'react'

import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/customImages/loginBackground.jpg'
          alt='Login Background'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
      </div>

      <div className='relative z-10 flex items-center justify-between p-6 md:p-8 mx-16'>
        <div className='flex items-center gap-3'>
          <Image src={'svgs/loginLogo.svg'} width={100} height={100} alt='nav Logo' className='mt-2' />
        </div>
        <div className='hidden  text-[#0B2952] md:flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <i className='ri-phone-line text-xl'></i>
            <span className='text-lg font-medium'>0800 690 6300</span>
          </div>
          <div className='flex items-center gap-2'>
            <i className='ri-mail-line text-lg'></i>
            <span className='text-lg font-medium'>info@savemyservicecharge.co.uk</span>
          </div>
        </div>
      </div>

      <div className='relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6'>
        <div className='w-full max-w-md'>
          <div
            className='bg-white bg-opacity-65 rounded-[25px] p-8'
            style={{ boxShadow: '1px 2px 24px 0px #00000014' }}
          >
            {children}
          </div>
        </div>
      </div>

      <div className='md:hidden relative z-10 p-6'>
        <div className='flex items-center justify-center gap-6 text-white'>
          <div className='flex items-center gap-2'>
            <i className='ri-phone-line text-lg'></i>
            <span className='text-sm font-medium'>0800 690 6300</span>
          </div>
          <div className='flex items-center gap-2'>
            <i className='ri-mail-line text-lg'></i>
            <span className='text-sm font-medium'>info@savemyservicecharge.co.uk</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
