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
        minWidth: 'fit-content',
        maxWidth: 'none',
        color: '#35C0ED',
        borderRadius: '16px',
        padding: '8px 12px',
        '& .MuiChip-label': {
          fontSize: '14px',
          fontWeight: 500,
          whiteSpace: 'nowrap'
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
