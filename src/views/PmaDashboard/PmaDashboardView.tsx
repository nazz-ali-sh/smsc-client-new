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
import type { PmaStatsType } from '@/views/PmaTenderListing/types'

interface PmaDashboardViewProps {
  statsData?: PmaStatsType
}

const PmaDashboardView = ({ statsData }: PmaDashboardViewProps) => {
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <div className='flex max-md:flex-col md:items-center gap-6 plb-5 w-full'>
        <div className='md:flex-[8]'>
          <TenderStats text='Welcome Back' statsData={statsData} />
        </div>
        <Divider sx={{ marginY: '3px' }} orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem />
        <div className='md:flex-[4]'>
          <PrimaryUserCard
            pmaNumber={statsData?.pma_number}
            activeOffices={statsData?.active_offices}
            activeUsers={statsData?.active_users}
            subUserVisibility={statsData?.sub_user_visibility}
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
