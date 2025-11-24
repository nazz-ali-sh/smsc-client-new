'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import TenderStats from '@/common/TenderStats'
import PrimaryUserCard from '@/views/PmaCalendar/components/PrimaryUserCard'
import TenderStatusCards from './components/TenderStatusCards'
import CongratulationsSlider from './components/CongratulationsSlider'
import PendingIncomeSection from './components/PendingIncomeSection'
import BranchManagementSection from './components/BranchManagementSection'
import { usePmadsahbaordData } from '@/hooks/usePmadsahbaordData'

const PmaDashboardView = () => {
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { data: dashboardData } = usePmadsahbaordData()

  return (
    <Box>
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

      <TenderStatusCards />

      <CongratulationsSlider />

      <PendingIncomeSection />

      <BranchManagementSection />
    </Box>
  )
}

export default PmaDashboardView
