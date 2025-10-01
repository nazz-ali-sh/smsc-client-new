import { Box, Typography } from '@mui/material'

import TimeSlotChip from './TimeSlotChip'
import TimePickerSection from './TimePickerSection'
import type { TimeSlot, NewSlot } from '../types'

interface DayRowProps {
  day: string
  slots: TimeSlot[]
  newSlots: NewSlot
  onTimeChange: (day: string, field: 'startTime' | 'endTime', value: string) => void
  onAddSlot: (day: string) => void
  onRemoveSlot: (day: string, slotId: string) => void
  getAvailableStartTimes: (day: string) => string[]
  getAvailableEndTimes: (day: string, startTime: string) => string[]
  formatTimeForDisplay: (time: string) => string
  isLast: boolean
}

const DayRow = ({
  day,
  slots,
  newSlots,
  onTimeChange,
  onAddSlot,
  onRemoveSlot,
  getAvailableStartTimes,
  getAvailableEndTimes,
  formatTimeForDisplay,
  isLast
}: DayRowProps) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 0',
          gap: '3px'
        }}
      >
        <Box sx={{ minWidth: '100px' }}>
          <Typography
            variant='body1'
            sx={{
              color: '#374151',
              fontSize: '16px',
              fontWeight: 500
            }}
          >
            {day}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
            flex: 1,
            minWidth: 0
          }}
        >
          {slots.map(slot => (
            <Box
              key={slot.id}
              sx={{
                flex: '1 1 1',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <TimeSlotChip
                startTime={slot?.startTime}
                endTime={slot?.endTime}
                onDelete={() => onRemoveSlot(day, slot?.id)}
                formatTimeForDisplay={formatTimeForDisplay}
              />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            width: '1px',
            backgroundColor: '#E5E7EB',
            margin: '0 16px',
            alignSelf: 'stretch',
            minHeight: '60px'
          }}
        />

        <TimePickerSection
          day={day}
          newSlots={newSlots}
          onTimeChange={onTimeChange}
          onAddSlot={onAddSlot}
          getAvailableStartTimes={getAvailableStartTimes}
          getAvailableEndTimes={getAvailableEndTimes}
          formatTimeForDisplay={formatTimeForDisplay}
        />
      </Box>

      {!isLast && (
        <Box
          sx={{
            height: '1px',
            backgroundColor: '#E5E7EB',
            margin: '0'
          }}
        />
      )}
    </Box>
  )
}

export default DayRow
