'use client'

import { Alert, Box, Typography } from '@mui/material'

const PmaOnboardingAlert = () => {
  return (
    <Box mb={4}>
      <Alert severity='warning' variant='outlined'>
        <Typography fontWeight={600}>Your account is not yet active.</Typography>
        <Typography variant='body2'>
          You won’t receive any tender invitations until your profile is complete. Please finish your setup under:{' '}
          <strong>My Account &gt; Company Profile</strong>.
        </Typography>
      </Alert>
    </Box>
  )
}

export default PmaOnboardingAlert
