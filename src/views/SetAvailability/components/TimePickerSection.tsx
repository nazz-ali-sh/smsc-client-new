import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import type { NewSlot } from '../types'

interface TimePickerSectionProps {
  day: string
  newSlots: NewSlot
  onTimeChange: (day: string, field: 'startTime' | 'endTime', value: string) => void
  onAddSlot: (day: string) => void
  getAvailableStartTimes: (day: string) => string[]
  getAvailableEndTimes: (day: string, startTime: string) => string[]
  formatTimeForDisplay: (time: string) => string
}

const TimePickerSection = ({
  day,
  newSlots,
  onTimeChange,
  onAddSlot,
  getAvailableStartTimes,
  getAvailableEndTimes,
  formatTimeForDisplay
}: TimePickerSectionProps) => {
  return (
    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1, minWidth: 0 }}>
      <FormControl size='small' sx={{ minWidth: '200px' }}>
        <InputLabel>Start time</InputLabel>
        <Select
          value={newSlots.startTime}
          onChange={e => onTimeChange(day, 'startTime', e.target.value)}
          label='Start time'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderColor: '#D1D5DB',
              '&:hover fieldset': {
                borderColor: '#9CA3AF'
              }
            }
          }}
        >
          {getAvailableStartTimes(day).map(time => (
            <MenuItem key={time} value={time}>
              {formatTimeForDisplay(time)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant='body1'
        sx={{
          color: '#6B7280',
          fontSize: '18px',
          fontWeight: 500,
          margin: '0 8px'
        }}
      >
        -
      </Typography>

      <FormControl size='small' sx={{ minWidth: '200px' }}>
        <InputLabel>End time</InputLabel>
        <Select
          value={newSlots.endTime}
          onChange={e => onTimeChange(day, 'endTime', e.target.value)}
          label='End time'
          disabled={!newSlots.startTime}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderColor: '#D1D5DB',
              '&:hover fieldset': {
                borderColor: '#9CA3AF'
              }
            }
          }}
        >
          {getAvailableEndTimes(day, newSlots.startTime).map(time => (
            <MenuItem key={time} value={time}>
              {formatTimeForDisplay(time)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className='flex justify-end'>
        <button
          className='bg-[#35C0ED] cursor-pointer text-white size-9 rounded-md flex justify-center items-center'
          onClick={() => onAddSlot(day)}
          disabled={!newSlots.startTime || !newSlots.endTime}
        >
          <i className='ri-add-line text-2xl'></i>
        </button>
      </div>
    </Box>
  )
}

export default TimePickerSection
