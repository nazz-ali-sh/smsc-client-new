'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import { CalendarWrapper, InvitesCard, PrimaryUserCard, MetricCards } from './components'
import AppFullCalendar from '@/libs/styles/AppFullCalendar'

const PmaCalendar = () => {
  return (
    <Box className='p-5'>
      <Grid container spacing={3} className='mbe-6'>
        <Grid item xs={12} md={6}>
          <InvitesCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <PrimaryUserCard />
        </Grid>
      </Grid>

      <MetricCards />
      <Card className='overflow-visible'>
        <AppFullCalendar className='app-calendar'>
          <CalendarWrapper />
        </AppFullCalendar>
      </Card>
    </Box>
  )
}

export default PmaCalendar
