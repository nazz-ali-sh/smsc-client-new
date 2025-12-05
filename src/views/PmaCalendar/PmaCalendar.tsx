'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import { Divider, useMediaQuery, useTheme } from '@mui/material'

import CalendarWrapper from './components/CalendarWrapper'

import AppFullCalendar from '@/libs/styles/AppFullCalendar'
import TenderStats from '@/common/TenderStats'
import PrimaryUserCard from './components/PrimaryUserCard'
import { usePmadsahbaordData } from '@/hooks/usePmadsahbaordData'

const PmaCalendar = () => {
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { data: dashboardData } = usePmadsahbaordData()

  return (
    <Box className=''>
      <div className='flex max-md:flex-col md:items-center gap-6 plb-5 w-full'>
        <div className='md:flex-[8]'>
          <TenderStats
            text='Welcome Back'
            statsData={{
              responses_sent_to: dashboardData?.data?.dashboard_stats?.tender_submitted,
              shortlisted_for_tender: dashboardData?.data?.dashboard_stats?.tender_shortlisted,
              tender_won: dashboardData?.data?.dashboard_stats?.tender_won
            }}
          />
        </div>
        <Divider sx={{ marginY: '3px' }} orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem />
        <div className='md:flex-[4]'>
          <PrimaryUserCard
            pmaNumber={dashboardData?.data?.primary_user?.user_id}
            activeOffices={dashboardData?.data?.primary_user?.active_offices}
            activeUsers={dashboardData?.data?.primary_user?.active_users}
          />
        </div>
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
