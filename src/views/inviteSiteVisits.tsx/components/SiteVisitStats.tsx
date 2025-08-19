'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const SiteVisitStats = () => {
  return (
    <Grid container spacing={7} className='mbe-6'>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box
              className='size-10  rounded-xl flex items-center justify-center'
              sx={{ backgroundColor: 'customColors.cyan1' }}
            >
              <i className='ri-customer-service-2-line text-xl text-[#35C0ED] ' />
            </Box>
            <Box>
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, fontSize: '18px', color: 'customColors.darkGray1' }}
                className='leading-[28px]'
              >
                27
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                className='leading-[22px]'
                sx={{ fontSize: '15px', fontWeight: 400, color: 'customColors.gray7' }}
              >
                Scheduled Calls
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box
              className='size-10 rounded-xl flex items-center justify-center'
              sx={{ backgroundColor: 'customColors.green6' }}
            >
              <i className='ri-phone-line text-xl text-[#72E128]' />
            </Box>
            <Box>
              <Typography
                variant='h6'
                className='leading-[28px]'
                sx={{ fontWeight: 700, fontSize: '18px', color: 'customColors.darkGray1' }}
              >
                3
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                className='leading-[22px]'
                sx={{ fontSize: '15px', fontWeight: 400, color: 'customColors.gray7' }}
              >
                Completed Calls
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box
              className='size-10  rounded-xl flex items-center justify-center'
              sx={{ backgroundColor: 'customColors.cyan1' }}
            >
              <i className='ri-map-pin-line text-xl  text-[#35C0ED]' />
            </Box>
            <Box>
              <Typography
                variant='h6'
                className='leading-[28px]'
                sx={{ fontWeight: 700, fontSize: '18px', color: 'customColors.darkGray1' }}
              >
                6
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                className='leading-[22px]'
                sx={{ fontSize: '15px', fontWeight: 400, color: 'customColors.gray7' }}
              >
                Scheduled Visits
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box
              className='size-10 rounded-xl flex items-center justify-center'
              sx={{ backgroundColor: 'customColors.green6' }}
            >
              <i className='ri-map-line text-xl text-[#72E128]' />
            </Box>
            <Box>
              <Typography
                variant='h6'
                className='leading-[28px]'
                sx={{ fontWeight: 700, fontSize: '18px', color: 'customColors.darkGray1' }}
              >
                10
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
                className='leading-[22px]'
                sx={{ fontSize: '15px', fontWeight: 400, color: 'customColors.gray7' }}
              >
                Successful visits
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SiteVisitStats
