import React from 'react'

import { Box } from '@mui/material'

import InviteCallStats from './components/InviteCallStats'
import InviteCallsTabs from './components/InviteCallsTabs'

const InviteCallsView = () => {
  return (
    <Box>
      <InviteCallStats />
      <InviteCallsTabs />
    </Box>
  )
}

export default InviteCallsView
