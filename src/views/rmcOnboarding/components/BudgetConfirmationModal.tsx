'use client'

import React from 'react'

import CustomButton from '@/common/CustomButton'
import CommonModal from '@/common/CommonModal'
import { budgetFields } from '@/constants'
import type { BudgetConfirmationModalProps } from '../types'

const BudgetConfirmationModal = ({
  isOpen,
  onClose,
  budgetData,
  onConfirm,
  onEdit,
  isLoading = false
}: BudgetConfirmationModalProps) => {
  const calculateTotal = (data: BudgetFormData): number => {
    const values = [
      parseFloat(data?.managing_fee) || 0,
      parseFloat(data?.accounting_fee) || 0,
      parseFloat(data?.cosec_fee) || 0,
      parseFloat(data?.out_of_hours_fee) || 0,
      parseFloat(data?.emergency_fee) || 0,
      parseFloat(data?.fire_door_fee) || 0,
      parseFloat(data?.anti_money_fee) || 0
    ]

    return values?.reduce((sum, value) => sum + value, 0)
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    })?.format(value)
  }

  const getModalBudgetSummary = () => {
    if (!budgetData) return []

    return budgetFields
      ?.map((field, index) => ({
        sr: String(index + 1).padStart(2, '0'),
        fee: field?.label,
        amount: parseFloat(budgetData[field?.name as keyof BudgetFormData] as string) || 0
      }))
      ?.filter(item => item?.amount > 0)
  }

  return (
    <CommonModal
      isOpen={isOpen}
      handleClose={onClose}
      header='Thank You for Providing Your Budget'
      maxWidth='md'
      fullWidth
    >
      <div className='p-6'>
        <div className='mb-6 space-y-3'>
          <p className='text-[#696969] text-base font-normal'>
            Including this information gives Managing Agents a clearer picture of your block and helps you receive more
            accurate, competitive quotes.
          </p>
          <p className='text-[#696969] text-base font-normal'>
            Before continuing, please double-check that the figures are correct. Once you confirm, this step is locked
            and can't be changed after your tender goes live.
          </p>
        </div>

        <div className='bg-white border border-gray-200 rounded-lg overflow-hidden mb-6'>
          <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
            <div className='grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700'>
              <div className='col-span-2'>Sr#</div>
              <div className='col-span-6'>Fee</div>
              <div className='col-span-4 text-right'>Per Block</div>
            </div>
          </div>

          <div className='divide-y divide-gray-200'>
            {getModalBudgetSummary()?.map((item, index) => (
              <div key={index} className='px-4 py-3'>
                <div className='grid grid-cols-12 gap-4 text-sm'>
                  <div className='col-span-2 text-gray-600'>{item?.sr}</div>
                  <div className='col-span-6 text-gray-800'>{item?.fee}</div>
                  <div className='col-span-4 text-right font-medium text-gray-800'>{formatCurrency(item?.amount)}</div>
                </div>
              </div>
            ))}

            <div className='px-4 py-3 bg-gray-50 border-t-2 border-gray-300'>
              <div className='grid grid-cols-12 gap-4 text-sm font-semibold'>
                <div className='col-span-2'></div>
                <div className='col-span-6 text-gray-800'>TOTAL</div>
                <div className='col-span-4 text-right text-gray-800'>
                  {budgetData ? formatCurrency(calculateTotal(budgetData)) : '£0.00'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between gap-4'>
          <CustomButton variant='outlined' onClick={onEdit}>
            Back To Edit
          </CustomButton>

          <CustomButton
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            endIcon={<i className='ri-arrow-right-line'></i>}
          >
            {isLoading ? 'Confirming...' : 'Confirm'}
          </CustomButton>
        </div>
      </div>
    </CommonModal>
  )
}

export default BudgetConfirmationModal
