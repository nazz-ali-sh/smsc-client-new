import { useState } from 'react'

import type { TimeSlot, DaySlots, NewSlots } from '../types'
import { TIME_OPTIONS, DAYS } from '../constants'

export const useAvailability = () => {
  const [daySlots, setDaySlots] = useState<DaySlots>(() => {
    const initialSlots: DaySlots = {} as DaySlots

    DAYS.forEach(day => {
      initialSlots[day] = []
    })

    return initialSlots
  })

  const [newSlots, setNewSlots] = useState<NewSlots>(() => {
    const initialNewSlots: NewSlots = {} as NewSlots

    DAYS.forEach(day => {
      initialNewSlots[day] = { startTime: '', endTime: '' }
    })

    return initialNewSlots
  })

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    if (field === 'startTime') {
      const startTimeIndex = TIME_OPTIONS.indexOf(value)
      const endTimeIndex = startTimeIndex + 1

      if (endTimeIndex < TIME_OPTIONS.length) {
        const autoEndTime = TIME_OPTIONS[endTimeIndex]

        setNewSlots(prev => ({
          ...prev,
          [day]: {
            startTime: value,
            endTime: autoEndTime
          }
        }))
      } else {
        setNewSlots(prev => ({
          ...prev,
          [day]: {
            startTime: value,
            endTime: ''
          }
        }))
      }
    } else {
      setNewSlots(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [field]: value
        }
      }))
    }
  }

  const getAvailableStartTimes = (day: string) => {
    const existingSlots = daySlots[day]

    if (existingSlots.length === 0) {
      return TIME_OPTIONS
    }

    const latestEndTime = existingSlots.reduce((latest, slot) => {
      return slot.endTime > latest ? slot.endTime : latest
    }, '00:00')

    return TIME_OPTIONS.filter(time => time >= latestEndTime)
  }

  const getAvailableEndTimes = (day: string, startTime: string) => {
    if (!startTime) return TIME_OPTIONS

    return TIME_OPTIONS.filter(time => time > startTime)
  }

  const handleAddSlot = (day: string) => {
    const newSlot = newSlots[day]

    if (newSlot.startTime && newSlot.endTime) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        startTime: newSlot.startTime,
        endTime: newSlot.endTime
      }

      setDaySlots(prev => ({
        ...prev,
        [day]: [...prev[day], slot]
      }))

      setNewSlots(prev => ({
        ...prev,
        [day]: { startTime: '', endTime: '' }
      }))
    }
  }

  const handleRemoveSlot = (day: string, slotId: string) => {
    setDaySlots(prev => ({
      ...prev,
      [day]: prev[day].filter(slot => slot.id !== slotId)
    }))
  }

  const handleSaveChanges = () => {
    console.log('Saving availability slots:', daySlots)
  }

  const formatTimeForDisplay = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour

    return `${displayHour}:${minutes} ${ampm}`
  }

  return {
    daySlots,
    newSlots,
    handleTimeChange,
    getAvailableStartTimes,
    getAvailableEndTimes,
    handleAddSlot,
    handleRemoveSlot,
    handleSaveChanges,
    formatTimeForDisplay
  }
}
