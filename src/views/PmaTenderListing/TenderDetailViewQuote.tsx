'use client'

import React from 'react'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { usePmaTenderDetail } from '@/hooks/usePmaTenderDetail'
import CustomLoader from '@/common/CustomLoader'
import ResponseQuoteSection from './components/ResponseQuoteSection'
import QuoteFormSection from './components/QuoteFormSection'
import RmcDetailsCard from './components/RmcDetailsCard'
import { titleClass } from '@/constants/styles'
import type { TenderId } from './types'

const TenderDetailViewQuote = ({ tenderId }: TenderId) => {
  const { tenderDetailData, isLoading } = usePmaTenderDetail({ tenderId })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CustomLoader size='large' />
      </Box>
    )
  }

  return (
    <Box>
      <ResponseQuoteSection />

      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <RmcDetailsCard
            rmcName={tenderDetailData?.data?.rmc_data?.rmc_number}
            blockData={tenderDetailData?.data?.tender_onboarding}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ overflow: 'hidden' }}>
            <Box sx={{ backgroundColor: '#E6F7FCBF', paddingX: '20px', paddingY: '26px' }}>
              <Typography sx={titleClass}>Write your Quote</Typography>
            </Box>
            <CardContent sx={{ paddingX: '20px' }}>
              <QuoteFormSection tenderId={tenderId} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TenderDetailViewQuote
