'use client'

import React from 'react'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import type { BudgetSkipModalProps } from '../types'

const BudgetSkipModal = ({ isOpen, onClose, onSkipAnyway, onBackToEdit }: BudgetSkipModalProps) => {
  return (
    <CommonModal
      isOpen={isOpen}
      handleClose={onClose}
      header='Are You Sure You Want to Skip This Step?'
      maxWidth='md'
      fullWidth
    >
      <div className='p-6'>
        <div className='mb-6'>
          <p className='text-[#696969] text-base font-normal leading-relaxed'>
            Uploading your service charge budget gives Managing Agents the context they need to provide accurate,
            tailored quotes. Without it, your tender may receive fewer replies — and those that do come in may be vague
            or overpriced. We strongly recommend adding your budget to get the best results. Once your tender is live,
            you won't be able to upload it later.
          </p>
        </div>

        <div className='flex justify-between gap-4'>
          <CustomButton variant='outlined' onClick={onBackToEdit}>
            Back To Edit
          </CustomButton>

          <CustomButton onClick={onSkipAnyway}>Skip Anyway</CustomButton>
        </div>
      </div>
    </CommonModal>
  )
}

export default BudgetSkipModal
