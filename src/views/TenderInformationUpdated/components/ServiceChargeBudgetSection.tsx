'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Box, Grid, Typography } from '@mui/material'

import CommonModal from '@/common/CommonModal'
import type { ServiceChargeBudgetSectionProps } from '../types'

interface ExtendedServiceChargeBudgetSectionProps extends ServiceChargeBudgetSectionProps {
  itemsPerRow?: number
  sx?: object
  title?: string
  amountSymbol?: string
}

const ServiceChargeBudgetSection = ({
  budgetData,
  itemsPerRow = 5,
  sx,
  title,
  amountSymbol = '£'
}: ExtendedServiceChargeBudgetSectionProps) => {
  const [titleModalOpen, setTitleModalOpen] = useState(false)

  const allValuesNullOrZero = () => {
    if (!budgetData) return true

    const requiredFields = [
      budgetData?.managing_fee,
      budgetData?.accounting_fee,
      budgetData?.cosec_fee,
      budgetData?.out_of_hours_fee,
      budgetData?.emergency_fee,
      budgetData?.fire_door_fee,
      budgetData?.anti_money_fee
    ]

    return requiredFields.every(field => {
      const val = parseFloat(field || '0')

      return isNaN(val) || val === 0
    })
  }

  const calculateTotal = () => {
    if (!budgetData) return 0

    const fees = [
      parseFloat(budgetData?.managing_fee || '0'),
      parseFloat(budgetData?.accounting_fee || '0'),
      parseFloat(budgetData?.cosec_fee || '0'),
      parseFloat(budgetData?.out_of_hours_fee || '0'),
      parseFloat(budgetData?.emergency_fee || '0'),
      parseFloat(budgetData?.fire_door_fee || '0'),
      parseFloat(budgetData?.anti_money_fee || '0')
    ]

    return fees.reduce((sum, fee) => sum + (isNaN(fee) ? 0 : fee), 0)
  }

  const total = calculateTotal()
  const sectionTitle = title || `Your Blocks Fixed Cost Summary: ${amountSymbol}${total.toFixed(2)}`

  const budgetItems = [
    { label: 'Management Fee', value: budgetData?.managing_fee, icon: '/svgs/managementFee.svg' },
    { label: 'Accounting Fee', value: budgetData?.accounting_fee, icon: '/svgs/accountingFee.svg' },
    { label: 'Out of Hours Fee', value: budgetData?.out_of_hours_fee, icon: '/svgs/hoursFee.svg' },
    { label: 'CoSec Fee', value: budgetData?.cosec_fee, icon: '/svgs/coSec.svg' },
    { label: 'Emergency Lighting Fee', value: budgetData?.emergency_fee, icon: '/svgs/emergencyFee.svg' },
    { label: 'Fire Door Inspection', value: budgetData?.fire_door_fee, icon: '/svgs/doorInspection.svg' },
    { label: 'AML Checks', value: budgetData?.anti_money_fee, icon: '/svgs/amlChecks.svg' }
  ]

  const showNoCostsForAll = allValuesNullOrZero()

  return (
    <Box sx={{ marginBottom: 4, marginTop: '20px' }}>
      <Typography
        className='flex items-center gap-2'
        sx={
          sx
            ? sx
            : {
                fontWeight: 700,
                fontSize: '24px',
                color: 'customColors.darkGray1',
                marginTop: 10
              }
        }
      >
        {sectionTitle}
        <i
          className='ri-information-line cursor-pointer text-black transition-colors mb-1'
          onClick={() => setTitleModalOpen(true)}
        ></i>
      </Typography>

      <Box sx={{ marginBottom: 4, marginTop: ' 24px' }}>
        <Grid container spacing={3} rowSpacing={6}>
          {budgetItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={itemsPerRow === 3 ? 4 : 2.4} key={index} sx={{ minWidth: '250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    backgroundColor: 'customColors.ligthBlue1',
                    borderRadius: '8px'
                  }}
                >
                  <Image src={item?.icon} alt={item?.label} width={24} height={24} />
                </Box>
                <Box>
                  <Typography color='text.secondary' sx={{ fontSize: '12px' }}>
                    {item?.label}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 400, fontSize: '18px', color: 'customColors.darkGray1' }}
                  >
                    {showNoCostsForAll ? (
                      <p className='text-[12px] font-normal'> No Costs Supplied</p>
                    ) : item?.value && parseFloat(String(item.value)) > 0 ? (
                      `${amountSymbol}${item.value}`
                    ) : parseFloat(String(item?.value ?? '0')) === 0 ? (
                      '0'
                    ) : (
                      'No Costs Supplied'
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <CommonModal
        isOpen={titleModalOpen}
        handleClose={() => setTitleModalOpen(false)}
        header='Understanding Fixed Costs'
        maxWidth='md'
      >
        <div className='space-y-4'>
          <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
            These figures represent the fixed cost elements of your service charge budget - the items that are directly
            quoted by managing agents and can be fairly compared between tenders.
          </Typography>

          <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
            Variable costs (for example, cleaning, gardening, energy, and general repairs) usually transfer across to
            your new managing agent and will stay the same unless you ask them to re-tender those services or review
            existing supplier agreements.
          </Typography>

          <Typography variant='body2' className='text-[#696969] mb-3 text-xs leading-[22px]'>
            Comparing the fixed costs gives you the most accurate picture of value when selecting your managing agent.
            For more guidance, visit the FAQ section in your portal or download our “How to Compare Managing Agent
            Quotes” factsheet at savemyservicecharge.co.uk.
          </Typography>
        </div>
      </CommonModal>
    </Box>
  )
}

export default ServiceChargeBudgetSection
