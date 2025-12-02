'use client'

import React from 'react'

import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import PrioritiesSection from '@/views/TenderInformationUpdated/components/PrioritiesSection'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'
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

  const transformedBudgetData = tenderDetailData?.data?.rmc_service_charge_budget && {
    managing_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.managing_fee || 0),
    accounting_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.accounting_fee || 0),
    cosec_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.cosec_fee || 0),
    out_of_hours_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.out_of_hours_fee || 0),
    emergency_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.emergency_fee || 0),
    fire_door_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.fire_door_fee || 0),
    anti_money_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.anti_money_fee || 0)
  }

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
              {transformedBudgetData && (
                <Box sx={{ marginBottom: 4 }}>
                  <ServiceChargeBudgetSection
                    budgetData={transformedBudgetData}
                    itemsPerRow={3}
                    sx={titleClass}
                    title='Fixed Cost Quote from Managing Agent'
                  />
                  <Divider sx={{ mt: 8 }} />
                </Box>
              )}

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
