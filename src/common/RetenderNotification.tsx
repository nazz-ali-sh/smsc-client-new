'use client'

import React, { useState } from 'react'

import CustomButton from './CustomButton'
import RetenderModal from './RetenderModal'

const RetenderNotification = () => {
  const [isRetenderModalOpen, setIsRetenderModalOpen] = useState(false)

  const handleRetenderClick = () => {
    setIsRetenderModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsRetenderModalOpen(false)
  }

  return (
    <>
      <div className='w-full bg-[#FFF7ED] border border-[#E4A324] rounded-lg p-3 mb-6 mt-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start gap-3'>
            <div className='flex flex-col'>
              <h3 className='text-[#696969] font-semibold text-base'>📢 Not getting enough replies?</h3>
              <p className='text-[#696969] text-sm leading-6 pt-1'>
                We've noticed this tender has received fewer than 3 responses. To increase your chances of success, you
                can re-tender Your Block.
              </p>
            </div>
          </div>

          <div className='relative'>
            <CustomButton sx={{ px: 10 }} variant='contained' onClick={handleRetenderClick}>
              Re-Tender
            </CustomButton>
          </div>
        </div>
      </div>

      {isRetenderModalOpen && (
        <RetenderModal isOpen={isRetenderModalOpen} handleClose={handleCloseModal} tenderId='TND-xxxx' />
      )}
    </>
  )
}

export default RetenderNotification
