'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PrimaryUserCard = () => {
  return (
    <Card className='p-4'>
      <Box className='flex justify-between items-start'>
        <Box className='flex-1'>
          <Typography className='text-[28px] text-black font-bold'>Tender</Typography>
          <Typography variant='h6' color='text.secondary' className='mbe-4'>
            Tender Details ( Number ETC )
          </Typography>

          <Box className='mt-6'>
            <Typography variant='h6' className='mbe-2'>
              Tender Stage
            </Typography>
            <Box className='flex items-center gap-2'>
              <Box className='w-2 h-2 bg-red-500 rounded-full'></Box>
              <Typography variant='body2' color='text.secondary'>
                Went Live 17/5/2025
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className='flex flex-col items-center'>
          <Box className='relative w-32 h-32'>
            <Box
              className='absolute inset-0 rounded-full'
              style={{
                background: 'conic-gradient(#4CAF50 0deg 36deg, #E8F5E8 36deg 360deg)',
                transform: 'rotate(-90deg)'
              }}
            />
            <Box className='absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center'>
              <Typography variant='body2' color='text.secondary' className='mbe-1'>
                Progress
              </Typography>
              <Typography variant='h5' className='font-bold' color='text.primary'>
                10%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default PrimaryUserCard
