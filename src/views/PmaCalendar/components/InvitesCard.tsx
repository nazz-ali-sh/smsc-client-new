'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const InvitesCard = () => {
  return (
    <Card className='p-4'>
      <Typography className='text-[28px] text-black font-bold'>Invites</Typography>
      <Typography variant='h6' color='text.secondary' className='mbe-4'>
        Your Tender Progress so far
      </Typography>
      <Grid container spacing={3} className='py-5'>
        <Grid item xs={4}>
          <Box className='flex items-center gap-3'>
            <Box
              className='w-12 h-12 rounded-lg flex items-center justify-center'
              style={{ backgroundColor: '#F3E5F5' }}
            >
              <i className='ri-macbook-line text-xl' style={{ color: '#9C27B0' }} />
            </Box>
            <Box>
              <Typography variant='body2' className='mbe-1'>
                Live Tenders
              </Typography>
              <Typography variant='h6'>30</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className='flex items-center gap-3'>
            <Box
              className='w-12 h-12 rounded-lg flex items-center justify-center'
              style={{ backgroundColor: '#DDF6FE' }}
            >
              <i className='ri-lightbulb-line text-xl' style={{ color: '#6AC2ED' }} />
            </Box>
            <Box>
              <Typography variant='body2' className='mbe-1'>
                You have received
              </Typography>
              <Typography variant='h6' color='blue.600'>
                8 Responses
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className='flex items-center gap-3'>
            <Box
              className='w-12 h-12 rounded-lg flex items-center justify-center'
              style={{ backgroundColor: '#FDF3DC' }}
            >
              <i className='ri-shield-check-line text-xl' style={{ color: '#EEB327' }} />
            </Box>
            <Box>
              <Typography variant='body2' className='mbe-1'>
                Won Tenders
              </Typography>
              <Typography variant='h6' color='orange.600'>
                2
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default InvitesCard
