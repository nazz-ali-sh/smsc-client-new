'use client'

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

interface PrimaryUserCardProps {
  pmaNumber?: string | null
  activeOffices?: number
  activeUsers?: number
  subUserVisibility?: boolean
  onSubUserVisibilityChange?: (checked: boolean) => void
}

const PrimaryUserCard = ({
  pmaNumber,
  activeOffices = 0,
  activeUsers = 0,
  subUserVisibility = false,
  onSubUserVisibilityChange
}: PrimaryUserCardProps) => {
  return (
    <Card className='p-4 pb-7'>
      <Typography variant='h6' className='mbe-2'>
        Primary User
      </Typography>
      <Box className='mbe-4'>
        <Typography variant='body2' className='mbe-1'>
          User ID : {pmaNumber || 'PMA1XXXX'}
        </Typography>
        <Box className='flex items-center gap-2 mbe-1'>
          <Box className='px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2'>
            <Typography variant='body2' color='text.secondary'>
              Active Offices
            </Typography>
            <Typography variant='body2' color='green.600' fontWeight={600}>
              {activeOffices}
            </Typography>
          </Box>
        </Box>
        <Box className='flex items-center gap-2 mbe-1'>
          <Box className='px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2'>
            <Typography variant='body2' color='text.secondary'>
              Active Users
            </Typography>
            <Typography variant='body2' color='green.600' fontWeight={600}>
              {activeUsers}
            </Typography>
          </Box>
        </Box>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={subUserVisibility}
            onChange={e => onSubUserVisibilityChange?.(e.target.checked)}
          />
        }
        label='Sub User Visibility'
      />
    </Card>
  )
}

export default PrimaryUserCard
