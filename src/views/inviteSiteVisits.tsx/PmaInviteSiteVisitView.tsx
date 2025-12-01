import React from 'react'

import { Box } from '@mui/material'

import SiteVisitStats from './pmacomponents/SiteVisitStats'
import SiteVisitTabs from './pmacomponents/SiteVisitTabs'

const PmaInviteSiteVisitView = () => {
  return (
    <Box>
      <SiteVisitStats />
      <SiteVisitTabs />
    </Box>
  )
}

export default PmaInviteSiteVisitView
