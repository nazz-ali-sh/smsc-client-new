'use client'


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import CalendarWrapper from './components/CalendarWrapper'
import AgentInviteStats from '@/common/AgentInviteStats'

import AppFullCalendar from '@/libs/styles/AppFullCalendar'
import WeeklyReport from '@/common/WeeklyReport'
import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'


const PmaCalendar = () => {
  return (
    <Box className=''>
      <Grid container spacing={3} className='mbe-2'>
        <WeeklyReport text={'Invites'} />
      </Grid>

      <Box className='py-3'>
        <HorizontalLinearStepper />
      </Box>
      <div className='mt-2 mb-6'>
        <AgentInviteStats cardWidth="w-full sm:w-[48%] lg:w-[24%]"/>
      </div>

      <Card className='overflow-visible'>
        <AppFullCalendar className='app-calendar'>
          <CalendarWrapper />
        </AppFullCalendar>
      </Card>
    </Box>
  )
}

export default PmaCalendar
