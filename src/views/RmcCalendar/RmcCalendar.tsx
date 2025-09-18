'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import CalendarWrapper from './components/CalendarWrapper'
import MetricCards from './components/MetricCards'

import AppFullCalendar from '@/libs/styles/AppFullCalendar'
import WeeklyReport from '@/common/WeeklyReport'

const RmcCalendar = () => {
  return (
    <Box className=''>
      <Grid container spacing={3} className='mbe-6'>
        <WeeklyReport text={'Invites'} />
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

export default RmcCalendar
