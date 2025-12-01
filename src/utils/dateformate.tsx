export const formatDate = (dateString?: string | null): string => {
    if (!dateString) return '--'

    const date = new Date(dateString)

    if (isNaN(date.getTime())) return '--'

    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    return `${month}-${day}-${year}`
  }

  interface Slot {
  id: number | string
  slot_name: string
  start_time: string
  end_time: string
  booked?: boolean | string
}

  export const isSlotInPast = (slot: Slot, dateString: string): boolean => {
  if (!dateString) return false

  const slotDate = new Date(dateString)
  const [startStr] = slot.start_time.split(' - ')
  const [time, period] = startStr.trim().split(' ')

  const [hours, minutes] = time.split(':').map(Number)

  let finalHours = hours
  if (period === 'PM' && hours !== 12) finalHours += 12
  if (period === 'AM' && hours === 12) finalHours = 0

  slotDate.setHours(finalHours, minutes, 0, 0)

  return slotDate < new Date() 
}
