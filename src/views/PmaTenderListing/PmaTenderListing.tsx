'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import TenderStats from '@/common/TenderStats'
import PmaTenderTable from './components/PmaTenderTable'
import { usePmaStats } from '@/hooks/usePmaStats'
import PrimaryUserCard from '../PmaCalendar/components/PrimaryUserCard'

const PmaTenderListing = () => {
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { pmaStatsData } = usePmaStats()

  const statsData = pmaStatsData?.data

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

      <Box className='mt-6'>
        <PmaTenderTable />
      </Box>
    </Box>
  )
}

export default PmaTenderListing
