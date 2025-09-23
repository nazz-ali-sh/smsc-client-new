'use client'

import React from 'react'

import { Box, Card, CardContent } from '@mui/material'

import PainPointsSection from './PainPointsSection'
import PrioritiesSection from './PrioritiesSection'
import ServiceChargeBudgetSection from './ServiceChargeBudgetSection'
import BlockDetailsInfoSection from './BlockDetailsInfoSection'
import { useTenderDetail } from '@/hooks/useTenderDetail'

const BlockDetailsSection = () => {
  const { data: tenderDetailData } = useTenderDetail()

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
      <Card sx={{ borderRadius: 1, height: '100%', display: 'flex', flexDirection: 'column' }} className='px-8 '>
        <CardContent sx={{ p: 3 }}>
          <BlockDetailsInfoSection blockData={tenderDetailData?.block_details} />
          <ServiceChargeBudgetSection budgetData={tenderDetailData?.service_charge_budget} />
          <PrioritiesSection priorities={tenderDetailData?.priorities} />
          <PainPointsSection painPoints={tenderDetailData?.pain_points} />
        </CardContent>
      </Card>
    </Box>
  )
}

export default BlockDetailsSection
