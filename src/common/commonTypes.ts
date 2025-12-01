export interface Slot {
  id: number | string
  slot_name: string
  start_time: string
  end_time: string
  booked?: boolean | string  // optional, since sometimes it's missing
}

export interface SlotsApiResponse {
  success: boolean
  message: string
  data: {
    day_id: string
    slots: Slot[]
  }
}
