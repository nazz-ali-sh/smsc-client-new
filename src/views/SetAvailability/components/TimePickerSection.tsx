import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import type { NewSlot } from '../types'

const StyledFormControl = ({ children, ...props }: any) => (
  <FormControl
    size='small'
    sx={{
      '& .MuiInputLabel-root': {
        color: '#6C6C6C',
        fontSize: '14px'
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#35C0ED'
      },
      minWidth: '200px'
    }}
    {...props}
  >
    {children}
  </FormControl>
)

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
      <StyledFormControl>
        <InputLabel>Start time</InputLabel>
        <Select
          value={newSlots.startTime}
          onChange={e => onTimeChange(day, 'startTime', e.target.value)}
          label='Start time'
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflow: 'auto'
              }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D1D5DB',
              borderWidth: '1px'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9CA3AF',
              borderWidth: '1px'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#35C0ED',
              borderWidth: '1px'
            }
          }}
        >
          {getAvailableStartTimes(day).map(time => (
            <MenuItem key={time} value={time}>
              {formatTimeForDisplay(time)}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

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

      <StyledFormControl>
        <InputLabel>End time</InputLabel>
        <Select
          value={newSlots.endTime}
          onChange={e => onTimeChange(day, 'endTime', e.target.value)}
          label='End time'
          disabled={!newSlots.startTime}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflow: 'auto'
              }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D1D5DB',
              borderWidth: '1px'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9CA3AF',
              borderWidth: '1px'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#35C0ED',
              borderWidth: '1px'
            }
          }}
        >
          {getAvailableEndTimes(day, newSlots.startTime).map(time => (
            <MenuItem key={time} value={time}>
              {formatTimeForDisplay(time)}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

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
