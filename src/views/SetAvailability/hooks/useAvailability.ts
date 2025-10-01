import { useState, useEffect } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { TimeSlot, DaySlots, NewSlots } from '../types'
import { TIME_OPTIONS, DAYS } from '../constants'
import {
  saveAvailabilitySlots,
  getAvailabilitySlots,
  type AvailabilityPayload,
  type AvailabilitySlotResponse
} from '@/services/availability-apis/availability-api'

export const useAvailability = () => {
  const [daySlots, setDaySlots] = useState<DaySlots>(() => {
    const initialSlots: DaySlots = {} as DaySlots

    DAYS?.forEach(day => {
      initialSlots[day] = []
    })

    return initialSlots
  })

  const {
    data: availabilityData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['availabilitySlots'],
    queryFn: getAvailabilitySlots,
    refetchOnWindowFocus: false
  })

  const transformApiResponseToLocalState = (apiData: AvailabilitySlotResponse[]): DaySlots => {
    const transformedSlots: DaySlots = {} as DaySlots

    DAYS?.forEach(day => {
      transformedSlots[day] = []
    })

    apiData?.forEach(dayData => {
      const dayName = dayData?.day_name

      if (DAYS.includes(dayName)) {
        const slots: TimeSlot[] = dayData?.slots?.map((slot, index) => ({
          id: `${dayName}-${index}-${Date.now()}`,
          startTime: slot?.start_time,
          endTime: slot?.end_time
        }))

        transformedSlots[dayName] = slots
      }
    })

    return transformedSlots
  }

  useEffect(() => {
    if (availabilityData?.data) {
      const transformedData = transformApiResponseToLocalState(availabilityData?.data)

      setDaySlots(transformedData)
    }
  }, [availabilityData])

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

    if (existingSlots?.length === 0) {
      return TIME_OPTIONS
    }

    const latestEndTime = existingSlots?.reduce((latest, slot) => {
      return slot.endTime > latest ? slot.endTime : latest
    }, '00:00')

    return TIME_OPTIONS?.filter(time => time >= latestEndTime)
  }

  const getAvailableEndTimes = (day: string, startTime: string) => {
    if (!startTime) return TIME_OPTIONS

    return TIME_OPTIONS?.filter(time => time > startTime)
  }

  const handleAddSlot = (day: string) => {
    const newSlot = newSlots[day]

    if (newSlot?.startTime && newSlot?.endTime) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        startTime: newSlot?.startTime,
        endTime: newSlot?.endTime
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
      [day]: prev[day]?.filter(slot => slot?.id !== slotId)
    }))
  }

  const transformToApiPayload = (slots: DaySlots): AvailabilityPayload => {
    const availability: { day: string; slots: { start_time: string; end_time: string }[] }[] = []

    DAYS?.forEach(day => {
      const daySlots = slots[day] || []

      if (daySlots?.length > 0) {
        const transformedSlots = daySlots?.map(slot => ({
          start_time: slot?.startTime?.substring(0, 5),
          end_time: slot?.endTime?.substring(0, 5)
        }))

        availability.push({
          day: day?.toLowerCase(),
          slots: transformedSlots
        })
      }
    })

    return availability
  }

  const saveSlotsMutation = useMutation({
    mutationFn: (payload: AvailabilityPayload) => saveAvailabilitySlots(payload),
    onSuccess: () => {
      toast.success('Availability slots saved successfully!')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to save availability slots'

      toast.error(errorMessage)
    }
  })

  const hasAnySlots = () => {
    return DAYS?.some(day => daySlots[day] && daySlots[day]?.length > 0)
  }

  const handleSaveChanges = () => {
    const payload = transformToApiPayload(daySlots)

    saveSlotsMutation.mutate(payload)
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
    formatTimeForDisplay,
    isSaving: saveSlotsMutation?.isPending,
    isLoading,
    error,
    hasAnySlots: hasAnySlots()
  }
}
