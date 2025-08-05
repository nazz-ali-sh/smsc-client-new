import { parseISO, format } from 'date-fns'

export const formatDate = (isoDateString: string) => {
  try {
    const date = parseISO(isoDateString)

    return format(date, 'M/d/yyyy')
  } catch (error) {
    console.error('Invalid date format:', error)

    return null
  }
}
