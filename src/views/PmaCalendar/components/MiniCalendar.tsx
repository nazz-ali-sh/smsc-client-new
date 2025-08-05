'use client'

import React, { useState, useEffect } from 'react'

import { Box, Typography, IconButton } from '@mui/material'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths
} from 'date-fns'

interface MiniCalendarProps {
  currentDate: Date
  onDateSelect: (date: Date) => void
  events?: Array<{ date: string; color: string }>
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ currentDate, onDateSelect, events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(currentDate))
  const [selectedDate, setSelectedDate] = useState(() => format(currentDate, 'yyyy-MM-dd'))

  useEffect(() => {
    setSelectedDate(format(currentDate, 'yyyy-MM-dd'))
    setCurrentMonth(startOfMonth(currentDate))
  }, [currentDate])

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })

  const startOfMonthDate = startOfMonth(currentMonth)
  const firstDayOfWeek = startOfMonthDate.getDay()

  const daysFromPrevMonth = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const date = new Date(startOfMonthDate)

    date.setDate(date.getDate() - (firstDayOfWeek - i))

    return date
  })

  const endOfMonthDate = endOfMonth(currentMonth)
  const lastDayOfWeek = endOfMonthDate.getDay()

  const daysFromNextMonth = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => {
    const date = new Date(endOfMonthDate)

    date.setDate(date.getDate() + (i + 1))

    return date
  })

  const allDays = [...daysFromPrevMonth, ...daysInMonth, ...daysFromNextMonth]

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')

    setSelectedDate(dateStr)
    onDateSelect(date)
  }

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newMonth = direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1)

    setCurrentMonth(newMonth)
  }

  const getEventForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')

    return events.find(event => event.date === dateStr)
  }

  const isCurrentMonth = (date: Date) => isSameMonth(date, currentMonth)

  const isDateSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === selectedDate
  }

  return (
    <Box className='text-center'>
      <Box className='flex items-center justify-between mb-3'>
        <IconButton
          size='small'
          onClick={() => handleMonthChange('prev')}
          className='text-gray-600 hover:text-gray-800'
        >
          <i className='ri-arrow-left-s-line' />
        </IconButton>

        <Typography variant='h6' className='font-semibold'>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>

        <IconButton
          size='small'
          onClick={() => handleMonthChange('next')}
          className='text-gray-600 hover:text-gray-800'
        >
          <i className='ri-arrow-right-s-line' />
        </IconButton>
      </Box>
      <Box className='grid grid-cols-7 gap-1 mb-2'>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <Typography key={day} variant='caption' className='text-gray-600 font-medium py-1'>
            {day}
          </Typography>
        ))}
      </Box>
      <Box className='grid grid-cols-7 gap-1'>
        {allDays.map((date, index) => {
          const event = getEventForDate(date)
          const isSelected = isDateSelected(date)
          const isCurrentDay = isToday(date)
          const isCurrentMonthDay = isCurrentMonth(date)

          return (
            <Box
              key={`${index}-${format(date, 'yyyy-MM-dd')}`}
              onClick={() => handleDateClick(date)}
              className={`
                relative w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer
                ${isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}
                ${isCurrentDay ? 'bg-blue-500 text-white font-semibold' : ''}
                ${isSelected && !isCurrentDay ? 'bg-gray-200 font-semibold' : ''}
                ${!isCurrentMonthDay ? 'opacity-50' : ''}
                hover:bg-gray-100 transition-colors
              `}
            >
              {format(date, 'd')}

              {event && (
                <Box className='absolute -bottom-1 w-2 h-2 rounded-full' style={{ backgroundColor: event.color }} />
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default MiniCalendar
