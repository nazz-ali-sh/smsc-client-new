'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const InvitesCard = () => {
  return (
    <Card className='p-4'>
      <Typography className='text-[28px] text-black font-bold'>Tender Information</Typography>
      <Typography variant='h6' color='text.secondary' className='mbe-4'>
        Your Tender Progress so far
      </Typography>

      <Box className='flex gap-6 pt-2'>
        <Box className='flex items-center gap-3'>
          <Box className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: '#E8E0F8' }}>
            <i className='ri-macbook-line text-xl' style={{ color: '#9C27B0' }} />
          </Box>
          <Box>
            <Typography variant='body2' className='mbe-1' color='text.secondary'>
              Tender Sent to
            </Typography>
            <Typography variant='h6' style={{ color: '#9C27B0' }} fontWeight={600}>
              120PMAs
            </Typography>
          </Box>
        </Box>

        <Box className='flex items-center gap-3'>
          <Box className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: '#DDF6FE' }}>
            <i className='ri-lightbulb-line text-xl' style={{ color: '#6AC2ED' }} />
          </Box>
          <Box>
            <Typography variant='body2' className='mbe-1' color='text.secondary'>
              You have received
            </Typography>
            <Typography variant='h6' color='blue.600' fontWeight={600}>
              8 Responses
            </Typography>
          </Box>
        </Box>
        <Box className='flex items-center gap-3'>
          <Box className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: '#FFF3DC' }}>
            <i className='ri-shield-check-line text-xl' style={{ color: '#FFB300' }} />
          </Box>
          <Box>
            <Typography variant='body2' className='mbe-1' color='text.secondary'>
              Tender Ends on
            </Typography>
            <Typography variant='h6' style={{ color: '#FFB300' }} fontWeight={600}>
              14th June 2025
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default InvitesCard
