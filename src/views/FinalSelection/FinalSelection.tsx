'use client'

import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import CongratulationsSection from './components/CongratulationsSection'
import ManagingAgentDetails from './components/ManagingAgentDetails'
import ProjectMetrics from './components/ProjectMetrics'
import { fianlResults } from '@/services/final_result_and_archeive_apis/final_results_apis'

const FinalSelection = () => {
  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)
  const rmcTenderId = rmcData?.tender_id

  interface finalResultResponceData {
    data?: {
      pma_start_date?: string
      [key: string]: any
    }
    [key: string]: any
  }

  const {
    data: finalResultResponce,
    error,
    isError
  } = useQuery<finalResultResponceData, Error>({
    queryKey: ['finalResultData', rmcTenderId],
    queryFn: () => fianlResults(Number(rmcTenderId)),
    enabled: !!rmcTenderId,
    retry: 2
  })

  if (isError && error) {
    return (
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant='h4' sx={{ color: 'error.main', mb: 2 }}>
                No Appointment Found
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                {(error as any)?.response?.data?.message || 'No appointment found for this tender'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <CongratulationsSection startDate={finalResultResponce?.data?.pma_start_date} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ManagingAgentDetails finalSelection={finalResultResponce} />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProjectMetrics finalSelection={finalResultResponce} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default FinalSelection
