import React from 'react'

import { Grid } from '@mui/material'

import BlockDetailsSection from './components/BlockDetailsSection'

const TenderInformationView = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BlockDetailsSection />
      </Grid>
    </Grid>
  )
}

export default TenderInformationView
