'use client'

import { Grid } from '@mui/material'

import CardSkeleton from './CardSkeleton'

const DashboardSkeletonGrid = () => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={6} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSkeleton />
      </Grid>
    </Grid>
  )
}

export default DashboardSkeletonGrid
