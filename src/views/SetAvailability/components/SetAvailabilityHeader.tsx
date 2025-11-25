import { useRouter } from 'next/navigation'

import { Box, Typography } from '@mui/material'

import CustomButton from '@/common/CustomButton'


const SetAvailabilityHeader = () => {
  const router = useRouter()

  return (
    <>
      <CustomButton className='mt-2 mb-6' variant='outlined' onClick={() => router.push('/shortlist-agent')}>
        Back to Shortlist Agents
      </CustomButton>
      <Box sx={{ marginBottom: '32px' }}>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 700,
            color: '#374151',
            marginBottom: '8px'
          }}
        >
          Set Available Slots
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: '#6B7280',
            fontSize: '16px'
          }}
        >
          Select and add new time slots to book video calls or site visits with managing agents.
        </Typography>
      </Box>
    </>
  )
}

export default SetAvailabilityHeader
