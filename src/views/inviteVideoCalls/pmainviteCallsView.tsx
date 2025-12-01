import React from 'react'

import { Box } from '@mui/material'

import InviteCallStats from './pmacomponents/InviteCallStats'
import InviteCallsTabs from './pmacomponents/InviteCallsTabs'

const PmaInviteCallsView = () => {
  return (
    <Box>
      <InviteCallStats />
      <InviteCallsTabs />
    </Box>
  )
}

export default PmaInviteCallsView
