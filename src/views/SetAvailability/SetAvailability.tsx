'use client'

import { Box } from '@mui/material'

import CustomButton from '@/common/CustomButton'
import SetAvailabilityHeader from './components/SetAvailabilityHeader'
import DayRow from './components/DayRow'
import { useAvailability } from './hooks/useAvailability'
import { DAYS } from './constants'

const SetAvailability = () => {
  const {
    daySlots,
    newSlots,
    handleTimeChange,
    getAvailableStartTimes,
    getAvailableEndTimes,
    handleAddSlot,
    handleRemoveSlot,
    handleSaveChanges,
    formatTimeForDisplay
  } = useAvailability()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        padding: '24px',
        maxWidth: 'full',
        margin: '0 auto',
        paddingX: 12,
        borderRadius: '10px',
        boxShadow: 1
      }}
    >
      <SetAvailabilityHeader />

      <Box>
        {DAYS.map((day, index) => (
          <DayRow
            key={day}
            day={day}
            slots={daySlots[day]}
            newSlots={newSlots[day]}
            onTimeChange={handleTimeChange}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
            getAvailableStartTimes={getAvailableStartTimes}
            getAvailableEndTimes={getAvailableEndTimes}
            formatTimeForDisplay={formatTimeForDisplay}
            isLast={index === DAYS.length - 1}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '40px'
        }}
      >
        <CustomButton
          onClick={handleSaveChanges}
          sx={{
            fontSize: '16px',
            fontWeight: 700
          }}
        >
          Save Changes
        </CustomButton>
      </Box>
    </Box>
  )
}

export default SetAvailability
