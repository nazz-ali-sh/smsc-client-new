'use client'

import React from 'react'

import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

import BlockDetailsInfoSection from '@/views/TenderInformationUpdated/components/BlockDetailsInfoSection'
import PrioritiesSection from '@/views/TenderInformationUpdated/components/PrioritiesSection'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'
import PainPoints from '@/views/TenderInformations/PainPoints'
import { usePmaTenderDetail } from '@/hooks/usePmaTenderDetail'
import CustomLoader from '@/common/CustomLoader'
import { titleClass } from '@/constants/styles'
import type { TenderId } from './types'

const TenderDetailView = ({ tenderId }: TenderId) => {
  const { tenderDetailData, isLoading } = usePmaTenderDetail({ tenderId })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CustomLoader size='large' />
      </Box>
    )
  }

  const transformedBudgetData = tenderDetailData?.data?.rmc_service_charge_budget && {
    managing_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.managing_fee || 0),
    accounting_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.accounting_fee || 0),
    cosec_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.cosec_fee || 0),
    out_of_hours_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.out_of_hours_fee || 0),
    emergency_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.emergency_fee || 0),
    fire_door_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.fire_door_fee || 0),
    anti_money_fee: String(tenderDetailData?.data?.rmc_service_charge_budget?.anti_money_fee || 0)
  }

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ paddingX: '50px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 4,
                  paddingY: 3
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '8px',
                    backgroundColor: '#E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 2
                  }}
                >
                  <i className='ri-user-line' style={{ fontSize: '80px', color: '#9CA3AF' }} />
                </Box>
                <Typography variant='h4' sx={{ fontWeight: 700, color: '#262B43' }}>
                  {tenderDetailData?.data?.rmc_data?.rmc_number}
                </Typography>
              </Box>

              <BlockDetailsInfoSection
                blockData={tenderDetailData?.data?.tender_onboarding}
                isVerticalList={true}
                showTitle={false}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <PrioritiesSection
                priorities={tenderDetailData?.data?.rmc_priorities ?? []}
                cardsPerRow={3}
                titleSx={titleClass}
              />

              <Divider sx={{ mt: 8 }} />

              <Box sx={{ marginTop: 8 }}>
                <PainPoints painPoints={tenderDetailData?.data?.pain_points ?? []} titleSx={titleClass} />
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <ServiceChargeBudgetSection budgetData={transformedBudgetData} itemsPerRow={3} sx={titleClass} />
              </Box>

              {tenderDetailData?.data?.pma_response && (
                <Box className='pt-8 pb-32'>
                  <Typography sx={titleClass}>Response</Typography>

                  <Typography className='text-sm leading-7 text-[#736F6B] pt-3'>
                    {tenderDetailData?.data?.pma_response}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TenderDetailView
