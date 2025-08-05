'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const MetricCards = () => {
  return (
    <Grid container spacing={2} className='mbe-6'>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <i className='ri-customer-service-2-line text-xl text-blue-600' />
            </Box>
            <Box>
              <Typography variant='h6' className='mbe-1'>
                27
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Schedule Calls
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <i className='ri-phone-line text-xl text-green-600' />
            </Box>
            <Box>
              <Typography variant='h6' className='mbe-1'>
                3
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Complete Calls
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <i className='ri-map-pin-line text-xl text-blue-600' />
            </Box>
            <Box>
              <Typography variant='h6' className='mbe-1'>
                6
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Schedule Visits
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card className='p-4 py-6'>
          <Box className='flex items-center gap-3'>
            <Box className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <i className='ri-map-line text-xl text-green-600' />
            </Box>
            <Box>
              <Typography variant='h6' className='mbe-1'>
                10
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Successful visits
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MetricCards
