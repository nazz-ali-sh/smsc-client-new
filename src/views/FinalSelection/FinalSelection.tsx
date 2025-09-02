'use client'

import { Box, Container, Grid } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import CongratulationsSection from './components/CongratulationsSection'
import ManagingAgentDetails from './components/ManagingAgentDetails'
import ProjectMetrics from './components/ProjectMetrics'
import { fianlResults } from '@/services/final_result_and_archeive_apis/final_results_apis'
import type { RootState } from '@/redux-store'

const FinalSelection = () => {
  const rmcTenderId = useSelector((state: RootState) => state?.tenderForm?.tender_id)

  interface finalResultResponceData {
    finalResultResponce: any
  }

  const { data: finalResultResponce } = useQuery<finalResultResponceData, Error>({
    queryKey: ['finalResultData', rmcTenderId],
    queryFn: () => fianlResults(Number(rmcTenderId)),
    enabled: !!rmcTenderId,
    retry: false
  })

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <CongratulationsSection />
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
