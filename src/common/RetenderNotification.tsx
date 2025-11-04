'use client'

import React, { useState } from 'react'

import CustomButton from './CustomButton'
import RetenderModal from './RetenderModal'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux-store'

interface RetenderNotificationProps {
  title: string
  description: string
  buttonText: string
  buttonAction?: () => void
  showModal?: boolean
  tenderId?: string
  icon?: string
}

const RetenderNotification: React.FC<RetenderNotificationProps> = ({
  title,
  description,
  buttonText,
  buttonAction,
  showModal = false,
  icon = '📢'
}) => {
  const [isRetenderModalOpen, setIsRetenderModalOpen] = useState(false)
  const tenderName = useSelector((state: RootState) => state.rmcOnboarding.tenderName)
  

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction()
    } else if (showModal) {
      setIsRetenderModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsRetenderModalOpen(false)
  }

  return (
    <>
      <div
        className='w-full rounded-lg p-3 mb-6 mt-4'
        style={{
          backgroundColor: '#FFF7ED',
          border: `1px solid #E4A324`
        }}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-start gap-3'>
            <div className='flex flex-col'>
              <h3 className='text-[#696969] font-semibold text-base'>
                {icon} {title}
              </h3>
              <p className='text-[#696969] text-sm leading-6 pt-1'>{description}</p>
            </div>
          </div>

          <div className='relative'>
            <CustomButton sx={{ px: 10 }} variant='contained' onClick={handleButtonClick}>
              {buttonText}
            </CustomButton>
          </div>
        </div>
      </div>

      {showModal && isRetenderModalOpen && (
        <RetenderModal isOpen={isRetenderModalOpen} handleClose={handleCloseModal} tenderId={tenderName} />
      )}
    </>
  )
}

export default RetenderNotification
