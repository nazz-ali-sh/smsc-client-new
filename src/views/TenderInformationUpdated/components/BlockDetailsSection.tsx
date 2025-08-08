'use client'

import React from 'react'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { tenderInformationData } from '../data'
import PainPointsSection from './PainPointsSection'
import PrioritiesSection from './PrioritiesSection'

const BlockDetailsSection = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
      <Card sx={{ borderRadius: 1, height: '100%', display: 'flex', flexDirection: 'column' }} className='px-8 '>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ marginBottom: 4, paddingTop: '24px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '24px', color: 'customColors.darkGray1' }}>
              {tenderInformationData.name}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 4, marginTop: '24px' }}>
            <Grid container spacing={3} rowSpacing={6}>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-map-pin-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography color='text.secondary' sx={{ fontSize: '12px' }}>
                      Region
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.region}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-building-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary' sx={{ fontSize: '12px' }}>
                      Unit Count
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.unitCount} Units
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-grid-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary' sx={{ fontSize: '12px' }}>
                      Number of Blocks
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.blockCount.toString().padStart(2, '0')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-calendar-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary' sx={{ fontSize: '12px' }}>
                      Year Built
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.yearBuilt}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-shield-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary' sx={{ fontSize: '12px' }}>
                      Block Condition
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.blockCondition}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-plant-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary' sx={{ fontSize: '12px' }}>
                      Outdoor Space
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.outdoorSpace ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'customColors.ligthBlue1',
                      borderRadius: '8px'
                    }}
                  >
                    <i className='ri-settings-3-line' style={{ fontSize: '1.5rem', color: '#1976D2' }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary' sx={{ fontSize: '12px' }}>
                      Product Type
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 400, fontSize: '20px', color: 'customColors.darkGray1' }}
                    >
                      {tenderInformationData.propertyDetails.productType}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <PrioritiesSection />

          <PainPointsSection />
        </CardContent>
      </Card>
    </Box>
  )
}

export default BlockDetailsSection
