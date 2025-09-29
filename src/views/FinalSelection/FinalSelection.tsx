'use client'

import { Box, Container, Grid, Typography } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import CongratulationsSection from './components/CongratulationsSection'
import ManagingAgentDetails from './components/ManagingAgentDetails'
import ProjectMetrics from './components/ProjectMetrics'
import CustomLoader from '@/common/CustomLoader'
import { fianlResults } from '@/services/final_result_and_archeive_apis/final_results_apis'

const FinalSelection = () => {
  const rmcTenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

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
    isError,
    isLoading
  } = useQuery<finalResultResponceData, Error>({
    queryKey: ['finalResultData', rmcTenderId],
    queryFn: () => fianlResults(Number(rmcTenderId)),
    enabled: !!rmcTenderId,
    retry: 2
  })

  if (isLoading) {
    return (
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box>
          <CustomLoader message='Loading final selection results...' size='large' />
        </Box>
      </Container>
    )
  }

  if (isError && error) {
    return (
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box className='flex justify-center items-center h-[80vh]'>
          <Typography variant='body1' sx={{ color: 'text.secondary', fontSize: 18 }}>
            {(error as any)?.response?.data?.message || 'No appointment found for this tender'}
          </Typography>
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
