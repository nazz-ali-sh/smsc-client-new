export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
}

export interface DaySlots {
  [key: string]: TimeSlot[]
}

export interface NewSlot {
  startTime: string
  endTime: string
}

export interface NewSlots {
  [key: string]: NewSlot
}
