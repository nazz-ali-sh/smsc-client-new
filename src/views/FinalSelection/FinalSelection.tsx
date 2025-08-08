'use client'

import { Box, Container, Grid } from '@mui/material'

import CongratulationsSection from './components/CongratulationsSection'
import ManagingAgentDetails from './components/ManagingAgentDetails'
import ProjectMetrics from './components/ProjectMetrics'

const FinalSelection = () => {
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <CongratulationsSection />
          </Grid>
          <Grid item xs={12} md={4}>
            <ManagingAgentDetails />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProjectMetrics />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default FinalSelection
