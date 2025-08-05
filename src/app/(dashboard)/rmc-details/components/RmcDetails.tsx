'use client'

import React from 'react'

import { Box, Container } from '@mui/material'

import RmcDetailsContent from './RmcDetailsContent'

import { rmcData } from '../types/data'

const RmcDetails: React.FC = () => {
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box>
        <RmcDetailsContent rmcData={rmcData} />
      </Box>
    </Container>
  )
}

export default RmcDetails
