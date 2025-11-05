'use Clinet'

import { useState } from 'react'

import Image from 'next/image'

import { Typography, Box, Grid } from '@mui/material'

import { iconMap } from '@/common/data'
import CommonModal from '@/common/CommonModal'

interface pmaCostBreakDown {
  pmaCostBreakDown?: any
}

const PmaCostbreakdown: React.FC<pmaCostBreakDown> = ({ pmaCostBreakDown }) => {
  const [openPmatooltip, setOpenPmaTooltip] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Typography className='text-[#262B43E5]  font-bold text-[18px]'>
            Fixed Cost Quote from Managing Agent
          </Typography>
        </Box>

        <Box>
          <i
            className='ri-information-line cursor-pointer text-black transition-colors ml-2'
            onClick={() => setOpenPmaTooltip(true)}
          ></i>
        </Box>
      </Box>
      <section className='flex flex-wrap pt-[16px]'>
        {pmaCostBreakDown?.map((feeItem: any, feeIndex: any) => (
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
        <CommonModal
          isOpen={openPmatooltip}
          handleClose={() => setOpenPmaTooltip(false)}
          header='About this   quote'
          maxWidth='sm'
        >
          <div className='space-y-4'>
            <Typography variant='body1' className='text-[#696969] text-xs mt-3 leading-[22px]'>
              This quote covers the fixed-cost elements of your service charge (for example: management,
              accounting/CoSec, out-of- hours, AML checks, fire-door inspection). It’s valid based on the accuracy of
              the information your RMC supplied during onboarding.
            </Typography>

            <div>
              <Typography variant='body2' className='text-[#696969] mb-3 leading-[22px]'>
                Variable costs (such as window cleaning, gardening, energy, general repairs) can be carried over to your
                new managing agent unchanged, or you can ask them (after appointment) to re-tender or review suppliers
                to reduce costs.
              </Typography>
            </div>
          </div>
        </CommonModal>
      </section>
    </>
  )
}

export default PmaCostbreakdown
