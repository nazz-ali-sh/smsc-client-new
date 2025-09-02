'use client'

import type React from 'react'

import Image from 'next/image'

import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'

import { iconMap } from '@/common/data'

interface FinalSelectionResponse {
  finalSelection?: any
}

const ProjectMetrics: React.FC<FinalSelectionResponse> = ({ finalSelection }) => {
  console.log(finalSelection)

  const metrics: Array<{
    title: string
    value: string
    icon: string
    color: string
  }> = [
    {
      title: 'No. of Units Managed',
      value: `${finalSelection?.data?.company_details?.avg_units_per_manager} Properties`,
      icon: 'ri-building-line',
      color: '#4CAF50'
    },
    {
      title: 'Quotation',
      value: `$ ${finalSelection?.data?.company_details?.avg_units_per_manager} `,
      icon: 'ri-money-dollar-circle-line',
      color: '#2196F3'
    },
    {
      title: 'Trading Years',
      value: `${finalSelection?.data?.company_details?.trading_years} Years`,
      icon: 'ri-time-line',
      color: '#FF9800'
    }
  ]

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 4, paddingTop: '10px' }}>
            <Grid container spacing={4}>
              {metrics.map((metric, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${metric.color}15`,
                            border: `1px solid ${metric.color}30`
                          }}
                        >
                          <i
                            className={metric.icon}
                            style={{
                              fontSize: 24,
                              color: metric.color
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography variant='body2' sx={{ mb: 1, fontSize: '0.875rem' }}>
                            {metric.title}
                          </Typography>
                          <Typography variant='h5' sx={{ fontWeight: 500, fontSize: 15 }}>
                            {metric.value}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
            RMC Service Charge Budget
          </Typography>
          <section className='flex flex-wrap pt-[28px]'>
            {finalSelection?.data?.management_fees?.map((feeItem: any, feeIndex: any) => (
              <Grid item xs={12} sm={6} md={4} key={feeIndex} className='w-[240px]'>
                <>
                  <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                    <Grid container spacing={3} className='w-[230px]'>
                      <Grid item xs={12} sm={6} md={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              backgroundColor: '#E3F2FD',
                              borderRadius: '8px',
                              flexShrink: 0
                            }}
                          >
                            <Image src={iconMap[feeItem?.management_fee_slug]} alt='images' />
                          </Box>
                          <Box>
                            <Typography variant='body2' sx={{ fontWeight: 500 }} className='w-[180px]'>
                              {feeItem?.management_fee_title}
                            </Typography>
                            <Typography variant='caption' color='#262B43E5' className='text-[20px]'>
                              €{feeItem?.fee_amount}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              </Grid>
            ))}
          </section>
        </Box>
      </CardContent>

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
            PMA Cost Breakdown
          </Typography>
          <section className='flex flex-wrap pt-[28px]'>
            {finalSelection?.data?.management_fees?.map((feeItem: any, feeIndex: any) => (
              <Grid item xs={12} sm={6} md={4} key={feeIndex} className='w-[240px]'>
                <>
                  <Box sx={{ marginBottom: 4, marginTop: 4 }}>
                    <Grid container spacing={3} className='w-[230px]'>
                      <Grid item xs={12} sm={6} md={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              backgroundColor: '#E3F2FD',
                              borderRadius: '8px',
                              flexShrink: 0
                            }}
                          >
                            <Image src={iconMap[feeItem?.management_fee_slug]} alt='images' />
                          </Box>
                          <Box>
                            <Typography variant='body2' sx={{ fontWeight: 500 }} className='w-[180px]'>
                              {feeItem?.management_fee_title}
                            </Typography>
                            <Typography variant='caption' color='#262B43E5' className='text-[20px]'>
                              €{feeItem?.fee_amount}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              </Grid>
            ))}
          </section>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'customColors.ligthBlue',
              marginTop: 16,
              '&:hover': {
                backgroundColor: 'customColors.ligthBlue'
              }
            }}
            startIcon={<i className='ri-download-line' style={{ fontSize: 18, color: 'white' }} />}
          >
            Download Evaluation Matrix
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectMetrics
