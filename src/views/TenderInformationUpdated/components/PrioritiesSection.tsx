'use client'
import React from 'react'

import { Box, Card, Grid, Typography } from '@mui/material'

import type { PrioritiesSectionProps } from '../types'

const PrioritiesSection: React.FC<PrioritiesSectionProps> = ({ priorities }) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          marginBottom: 3,
          marginTop: '34px'
        }}
      >
        <Typography
          color='#1F4E8D'
          sx={{
            fontWeight: 700,
            fontSize: '24px',
            color: 'customColors.darkGray1'
          }}
        >
          Priorities
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ marginTop: '24px' }}>
        {priorities?.map(priority => (
          <Grid item xs={12} sm={6} md={3} key={priority?.id}>
            <Card sx={{ height: '100px' }} className='border-l-[4px] border-l-[#35C0ED]'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  height: '100%'
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingX: '12px',
                    paddingY: '12px'
                  }}
                >
                  <Typography
                    variant='subtitle2'
                    sx={{
                      fontWeight: 600,
                      marginBottom: 1,
                      color: '#1F4E8D'
                    }}
                  >
                    {priority?.id}. {priority?.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ lineHeight: 1.4, fontSize: '12px' }}
                    className='leading-[22px]'
                  >
                    {priority?.description || 'I want to reduce my service charges and get better value for money.'}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PrioritiesSection
