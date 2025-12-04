import React from 'react'

import { Box } from '@mui/material'

import SiteVisitStats from './pmacomponents/SiteVisitStats'
import SiteVisitTabs from './components/SiteVisitTabs'

const InviteSiteVisitView = () => {
  return (
    <Box>
      <SiteVisitStats />
      <SiteVisitTabs />
    </Box>
  )
}

export default InviteSiteVisitView
