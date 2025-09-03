import { Chip } from '@mui/material'

interface TimeSlotChipProps {
  startTime: string
  endTime: string
  onDelete: () => void
  formatTimeForDisplay: (time: string) => string
}

const TimeSlotChip = ({ startTime, endTime, onDelete, formatTimeForDisplay }: TimeSlotChipProps) => {
  return (
    <Chip
      label={`${formatTimeForDisplay(startTime)} to ${formatTimeForDisplay(endTime)}`}
      sx={{
        backgroundColor: '#DDF6FE',
        color: '#35C0ED',
        borderRadius: '16px',
        padding: '8px 12px',
        width: 'fit-content',
        '& .MuiChip-label': {
          fontSize: '14px',
          fontWeight: 500
        }
      }}
      deleteIcon={
        <i
          className='ri-close-line'
          style={{
            color: '#35C0ED',
            fontSize: '18px'
          }}
        />
      }
      onDelete={onDelete}
    />
  )
}

export default TimeSlotChip
