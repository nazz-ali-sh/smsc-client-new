'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Box, Card, CardContent, Chip, Typography } from '@mui/material'

import SummaryCards from '@/common/SummaryCardsDetails'
import BlockDetailsInfoSection from '@/views/TenderInformationUpdated/components/BlockDetailsInfoSection'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'
import CustomButton from '@/common/CustomButton'

const PmaArchiveDetailView = () => {
  const router = useRouter()

  const dummyTenderStatusDetails = {
    data: {
      totals: {
        total_archived: 52,
        total_expired: 5,
        total_shortlisted: 7,
        total_appointed: 3,
        total_not_shortlisted: 0
      }
    }
  }

  const dummyBlockData = {
    region: 'SW London',
    total_units: 38,
    number_of_blocks: '02',
    year_built: '2000s',
    block_condition: 'excellent',
    outdoor_space: 'yes',
    leasehold_type: 'modern_purpose_build',
    building_height: '11'
  } as any

  const dummyServiceChargeBudget = {
    managing_fee: '1234.56',
    accounting_fee: '150',
    cosec_fee: '875',
    out_of_hours_fee: '1756',
    emergency_fee: '750',
    fire_door_fee: '300',
    anti_money_fee: '875'
  }

  const dummyPmaCostBreakdown = {
    managing_fee: '1234.56',
    accounting_fee: '150',
    cosec_fee: '875',
    out_of_hours_fee: '1756',
    emergency_fee: '750',
    fire_door_fee: '300',
    anti_money_fee: '875'
  }

  const handleBackToList = () => {
    router.push('/archive')
  }

  const status = 'Appointed'
  const isAppointed = status === 'Appointed'

  return (
    <>
      <SummaryCards tenderStatusdetails={dummyTenderStatusDetails} />

      <Card sx={{ display: 'flex', flexDirection: 'column', marginTop: '35px', marginBottom: 10 }}>
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Chip
              label={status}
              color={isAppointed ? 'success' : 'error'}
              variant='outlined'
              size='medium'
              sx={{
                backgroundColor: isAppointed ? 'customColors.green4' : 'customColors.red2',
                color: isAppointed ? 'customColors.green3' : 'customColors.red1',
                borderColor: isAppointed ? 'customColors.green3' : 'customColors.red1',
                fontWeight: 500,
                fontSize: '14px',
                height: '32px'
              }}
            />
            <CustomButton variant='outlined' onClick={handleBackToList}>
              Back To List
            </CustomButton>
          </Box>
        </CardContent>

        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 8, marginX: 4 }}>
            <BlockDetailsInfoSection blockData={dummyBlockData} />
          </Box>

          <Box sx={{ mb: 8, marginX: 4 }}>
            <ServiceChargeBudgetSection budgetData={dummyServiceChargeBudget} />
          </Box>

          <Box sx={{ mb: 8, marginX: 4 }}>
            <ServiceChargeBudgetSection
              budgetData={dummyPmaCostBreakdown}
              title='PMA Cost Breakdown'
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                color: 'customColors.darkGray1',
                marginTop: 10
              }}
            />
          </Box>

          <Box sx={{ mb: 8, marginX: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                color: 'customColors.darkGray1',
                marginBottom: 3
              }}
            >
              PMA Response
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                fontSize: '14px',
                lineHeight: 1.8
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Massa eliquet sagittis duis eros tempor sit. Mattis sed tellus
              gravida accumsan nulla lobortis orci cursus. Lorem tempor adipiscing nibat landa nova etavi. Lorem cursus
              in nisi mollis nunc nisi eget. Aliquam aliquet dolor, elit dictum consectetur. Turpis mauris libero mauris
              lacus semper. Tortor sed ligula cursus eu commodo ultrices eu nisl at. Nunc sit arcu habitant elit
              sagittis nibh. Nunc vel purus elit aliquam tincidunt risus eu neque pharetra. Curabitur massa et,
              fermentum lorem ac magna sed porta a. Pellentesque duis neque pellentesque amet, consectetur mauris. Sed
              amet consectetur lorem ipsum dolor sit amet consectetur adipiscing elit.
            </Typography>
          </Box>

          <Box sx={{ mb: 4, marginX: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                color: 'customColors.darkGray1',
                marginBottom: 3
              }}
            >
              RMC Feedback
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                fontSize: '14px',
                lineHeight: 1.8
              }}
            >
              Your proposal was reviewed carefully. While we were not decided to proceed with another agent this time,
              we encourage you to continue engaging with us for upcoming tenders—your experience is valued.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default PmaArchiveDetailView
