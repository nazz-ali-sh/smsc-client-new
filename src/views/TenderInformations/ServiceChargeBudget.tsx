'use Client'

import Image from 'next/image'

import { Typography, Box, Grid } from '@mui/material'

import { iconMap } from '@/common/data'

import { currencySymbol } from '@/constants'

interface servicesBudget {
  servicesbuget?: any
  servicesbudgets?: any
}

const ServiceChargeBudget: React.FC<servicesBudget> = ({ servicesbuget }) => {
  return (
    <>
      <Typography variant='h3' className='text-darkblue pt-[34px] text-[18px]'>
        RMC Service Charge Budget
      </Typography>
      <section className='flex flex-wrap pt-[28px]'>
        {servicesbuget?.map((feeItem: any, feeIndex: any) => (
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
                          {currencySymbol}
                          {feeItem?.fee_amount}
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
    </>
  )
}

export default ServiceChargeBudget
