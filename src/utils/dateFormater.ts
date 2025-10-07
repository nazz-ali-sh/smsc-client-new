import { parseISO, format } from 'date-fns'
import dayjs from 'dayjs'

export const formatDate = (isoDateString: string) => {
  try {
    const date = parseISO(isoDateString)

    return format(date, 'M/d/yyyy')
  } catch (error) {
    console.error('Invalid date format:', error)

    return null
  }
}

 export const formatDates = (dateString?: string | null): string => {
    if (!dateString) return ''
    const date = new Date(dateString)

    if (isNaN(date.getTime())) return ''
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

export function getDaysPassed(dateString?: string): number {
  if (!dateString) return 0

  const completedDate = new Date(dateString)
  const today = new Date()

  const diffTime = today.getTime() - completedDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}


 export function calculateTimeLeft(expiryAt: string) {
  if (!expiryAt) return { days: "0", hours: "0", minutes: "0" }

  const now = dayjs()
  const target = dayjs(expiryAt)
  const diff = target.diff(now)

  if (diff <= 0) {
    return { days: "0", hours: "0", minutes: "0" }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return {
    days: days.toString(),
    hours: hours.toString(),
    minutes: minutes.toString()
  }
}


  export const handleCalendarDate = (dateString: string, setSelectedFullDate: any, setSelectedYearMonth : any) => {
    if (!dateString) return

    const date = new Date(dateString)

    const fullDate = date.toISOString().split('T')[0]

    const yearMonth = fullDate.slice(0, 7)

    setSelectedFullDate(fullDate)
    setSelectedYearMonth(yearMonth)
  }
