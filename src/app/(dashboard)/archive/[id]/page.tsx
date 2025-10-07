'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Card, CardContent, Chip } from '@mui/material'

import { useArchiveData } from '@/hooks/useArchiveData'
import SummaryCards from '@/common/SummaryCardsDetails'
import BlockDetailsInfoSection from '@/views/TenderInformationUpdated/components/BlockDetailsInfoSection'
import PmaCostBreakdown from '@/common/PmaCostBreakdown'
import CustomButton from '@/common/CustomButton'
import { useTenderDetail } from '@/hooks/useTenderDetail'
import ServiceChargeBudgetSection from '@/views/TenderInformationUpdated/components/ServiceChargeBudgetSection'

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params }: PageProps) => {
  const param_id = Number(params?.id)
  const [selectedPma, setSelectedPma] = useState<number | ''>('')
  const router = useRouter()

  const {
    archiveDetailsData,
    isArchiveDetailsLoading: isLoading,
    archiveDetailsError
  } = useArchiveData({ tenderId: param_id, pmaUserId: selectedPma ? Number(selectedPma) : undefined })

  const isError = !!archiveDetailsError

  const { data: tenderDetailData } = useTenderDetail()

  const handleChange = (event: any) => {
    setSelectedPma(event.target.value)
  }

  const handleBackToList = () => {
    router.push('/archive')
  }

  const status = archiveDetailsData?.data?.tender?.status
  const isAppointed = status === 'Appointed'

  return (
    <>
      <SummaryCards />
      
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '35px' }}>
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
            <BlockDetailsInfoSection blockData={tenderDetailData?.block_details} />
          </Box>
          <Box sx={{ mb: 8, marginX: 4 }}>
            <ServiceChargeBudgetSection budgetData={tenderDetailData?.service_charge_budget} />
          </Box>

          <PmaCostBreakdown
            archiveDetailsData={archiveDetailsData}
            selectedPma={selectedPma}
            handleChange={handleChange}
            isLoading={isLoading}
            isError={isError}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default Page
