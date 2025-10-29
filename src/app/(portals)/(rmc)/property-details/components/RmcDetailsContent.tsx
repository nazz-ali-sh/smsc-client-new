'use client'

import React, { useState } from 'react'

import { Grid } from '@mui/material'

import RmcSidebar from './RmcSidebar'
import RmcMainContent from './RmcMainContent'
import type { RmcData } from '../types/data'

interface RmcDetailsContentProps {
  rmcData: RmcData
}

const RmcDetailsContent: React.FC<RmcDetailsContentProps> = ({ rmcData }) => {
  const [activeTab, setActiveTab] = useState('Site Visits')

  return (
    <Grid container spacing={3} sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex' }}>
        <RmcSidebar rmcData={rmcData} />
      </Grid>

      <Grid item xs={12} md={8} lg={9} sx={{ display: 'flex' }}>
        <RmcMainContent rmcData={rmcData} activeTab={activeTab} onTabChange={setActiveTab} />
      </Grid>
    </Grid>
  )
}

export default RmcDetailsContent
