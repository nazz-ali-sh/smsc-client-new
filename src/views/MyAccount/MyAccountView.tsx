'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import CustomButton from '@/common/CustomButton'
import { useMyAccount } from '@/hooks/useMyAccount'
import { placeholderImage } from '@/constants'

const MyAccountView: React.FC = () => {
  const router = useRouter()
  const { data: accountData } = useMyAccount()
  const user = accountData?.user
  const notificationPreferences = accountData?.notification_preferences
  const [imgSrc, setImgSrc] = useState(user?.logo_url || placeholderImage)

  const handleEditProfile = () => {
    router.push('/account-detail')
  }

  const notificationOptions = [
    {
      label: 'Receive Notifications by Email',
      key: 'notify_email' as const
    },
    {
      label: 'Receive Notifications by SMS',
      key: 'notify_message' as const
    },
    {
      label: 'Receive Notifications in the SMSC Portal',
      key: 'notify_portal' as const
    }
  ]

  const detailFields = [
    { label: 'Contact Name', value: user?.name || 'N/A' },
    { label: 'Phone Number', value: user?.mobile_number || 'N/A' },
    { label: 'Email', value: user?.email || 'N/A' }
  ]

  return (
    <div className='min-h-[60vh] flex justify-center bg-[#F8FAFC] mt-4'>
      <div className='w-full max-w-full bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] p-8'>
        <div className='flex items-center mb-6'>
          <div className='w-20 h-20 bg-[#1F2937] rounded-lg flex items-center justify-center mr-4 overflow-hidden'>
            {user?.logo_url ? (
              <Image
                src={imgSrc}
                alt='User Logo'
                width={60}
                height={60}
                className='w-full h-full object-cover'
                onError={() => setImgSrc(placeholderImage)}
              />
            ) : (
              <p className='text-white text-[20px] font-bold'>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</p>
            )}
          </div>
          <h1 className='text-[#1F2937] font-bold text-[28px]'>{user?.name || 'RMC Name'}</h1>
        </div>

        <div className='h-px bg-[#E5E7EB] mb-6' />

        <div className='mb-8'>
          <h2 className='text-[#262B43E5] font-medium text-[18px] mb-4'>Details</h2>
          <div className='flex flex-col gap-3 mt-3'>
            {detailFields.map(({ label, value }) => (
              <div key={label} className='flex justify-between'>
                <p className='text-[#777981] font-normal text-[14px]'>{label}</p>
                <p className='text-[#777981] font-normal text-[14px]'>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-[#262B43E5] font-medium text-[18px] mb-4 mt-8'>Notification Preferences</h2>
          <div className='flex flex-col gap-4'>
            {notificationOptions.map(({ label, key }) => {
              const isEnabled = notificationPreferences?.[key]

              return (
                <div key={key} className='flex justify-between items-center'>
                  <p className='text-[#777981] font-normal text-[14px]'>{label}</p>
                  <div className='flex items-center gap-1'>
                    <span className={`text-[16px] font-normal ${!isEnabled ? 'text-[#35C0ED]' : 'text-[#9CA3AF]'}`}>
                      No
                    </span>
                    <span className='text-[#9CA3AF]'>/</span>
                    <span className={`text-[16px] font-normal ${isEnabled ? 'text-[#35C0ED]' : 'text-[#9CA3AF]'}`}>
                      Yes
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='flex justify-end mt-8'>
          <CustomButton variant='contained' onClick={handleEditProfile}>
            Edit Profile
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default MyAccountView
