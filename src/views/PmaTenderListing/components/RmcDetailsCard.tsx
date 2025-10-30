'use client'

import React from 'react'

import { Box, Card, CardContent, Typography } from '@mui/material'

import BlockDetailsInfoSection from '@/views/TenderInformationUpdated/components/BlockDetailsInfoSection'
import type { RmcDetailsCardProps } from '../types'

const RmcDetailsCard = ({ rmcName, blockData }: RmcDetailsCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ paddingX: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 4,
            paddingY: 3
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: '8px',
              backgroundColor: '#E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2
            }}
          >
            <i className='ri-user-line' style={{ fontSize: '80px', color: '#9CA3AF' }} />
          </Box>
          <Typography variant='h4' sx={{ fontWeight: 700, color: '#262B43' }}>
            {rmcName || 'RMCxxxx'}
          </Typography>
        </Box>

        <BlockDetailsInfoSection blockData={blockData} isVerticalList={true} showTitle={false} />
      </CardContent>
    </Card>
  )
}

export default RmcDetailsCard
