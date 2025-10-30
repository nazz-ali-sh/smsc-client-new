'use client'

import React from 'react'

import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import PrioritiesSection from '@/views/TenderInformationUpdated/components/PrioritiesSection'
import PainPoints from '@/views/TenderInformations/PainPoints'
import { usePmaTenderDetail } from '@/hooks/usePmaTenderDetail'
import CustomLoader from '@/common/CustomLoader'
import ResponseQuoteSection from './components/ResponseQuoteSection'
import ResponseFormSection from './components/ResponseFormSection'
import RmcDetailsCard from './components/RmcDetailsCard'
import { titleClass } from '@/constants/styles'
import type { TenderId } from './types'

const TenderDetailViewResponse = ({ tenderId }: TenderId) => {
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
              <Typography sx={titleClass}>Written Response</Typography>
            </Box>
            <CardContent sx={{ paddingX: '20px' }}>
              <PrioritiesSection
                priorities={tenderDetailData?.data?.rmc_priorities ?? []}
                cardsPerRow={3}
                titleSx={titleClass}
              />

              <Divider sx={{ mt: 8 }} />

              <Box sx={{ marginTop: 8 }}>
                <PainPoints painPoints={tenderDetailData?.data?.pain_points ?? []} titleSx={titleClass} />
              </Box>
              <ResponseFormSection tenderId={tenderId} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TenderDetailViewResponse
