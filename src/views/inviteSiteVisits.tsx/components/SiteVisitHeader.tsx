'use client'

import React from 'react'

import { Box, Typography, Button } from '@mui/material'

interface InviteCallHeaderProps {
  title?: string
  actionButton?: React.ReactNode
}

const SiteVisitHeader = ({ title = 'Video Calls', actionButton }: InviteCallHeaderProps) => {
  return (
    <Box className=' p-6'>
      <Box className='flex justify-between items-center'>
        <Typography variant='h6' sx={{ color: 'customColors.gray9', fontWeight: 700, fontSize: '28px' }}>
          {title}
        </Typography>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#35C0ED',
            '&:hover': { backgroundColor: '#28A8D1' },
            textTransform: 'none'
          }}
          className='flex items-center gap-2'
        >
          {actionButton}
        </Button>
      </Box>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 400,
          color: 'customColors.gray8',
          paddingTop: '16px',
          maxWidth: '660px'
        }}
      >
        Manage your entire call history here. You can view all upcoming, rescheduled and completed calls in one
        centralized location.
      </Typography>
    </Box>
  )
}

export default SiteVisitHeader
