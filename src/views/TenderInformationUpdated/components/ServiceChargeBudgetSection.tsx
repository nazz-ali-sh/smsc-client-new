'use client'

import React from 'react'

import Image from 'next/image'

import { Box, Grid, Typography } from '@mui/material'

import type { ServiceChargeBudgetSectionProps } from '../types'

const ServiceChargeBudgetSection = ({ budgetData }: ServiceChargeBudgetSectionProps) => {
  const hasAllRequiredFields = () => {
    if (!budgetData) return false

    const requiredFields = [
      budgetData?.managing_fee,
      budgetData?.accounting_fee,
      budgetData?.cosec_fee,
      budgetData?.out_of_hours_fee,
      budgetData?.emergency_fee,
      budgetData?.fire_door_fee,
      budgetData?.anti_money_fee
    ]

    return requiredFields.every(field => field && field.trim() !== '')
  }

  if (!hasAllRequiredFields()) {
    return null
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

    return fees?.reduce((sum, fee) => sum + (isNaN(fee) ? 0 : fee), 0)
  }

  const total = calculateTotal()

  const budgetItems = [
    {
      label: 'Management Fee',
      value: budgetData?.managing_fee || '0',
      icon: '/svgs/managementFee.svg'
    },
    {
      label: 'Accounting Fee',
      value: budgetData?.accounting_fee || '0',
      icon: '/svgs/accountingFee.svg'
    },
    {
      label: 'Out of Hours Fee',
      value: budgetData?.out_of_hours_fee || '0',
      icon: '/svgs/hoursFee.svg'
    },
    {
      label: 'CoSec Fee',
      value: budgetData?.cosec_fee || '0',
      icon: '/svgs/coSec.svg'
    },
    {
      label: 'Emergency Lighting Fee',
      value: budgetData?.emergency_fee || '0',
      icon: '/svgs/emergencyFee.svg'
    },
    {
      label: 'Fire Door Inspection',
      value: budgetData?.fire_door_fee || '0',
      icon: '/svgs/doorInspection.svg'
    },
    {
      label: 'AML Checks',
      value: budgetData?.anti_money_fee || '0',
      icon: '/svgs/amlChecks.svg'
    },
    {
      label: 'Total',
      value: total.toFixed(2),
      icon: '/svgs/total.svg'
    }
  ]

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '24px', color: 'customColors.darkGray1', marginTop: 10 }}>
        Service Charge Budget
      </Typography>

      <Box sx={{ marginBottom: 4, marginTop: '24px' }}>
        <Grid container spacing={3} rowSpacing={6}>
          {budgetItems?.map((item, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
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
                    sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                  >
                    £{item?.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default ServiceChargeBudgetSection
