import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export interface AvailabilitySlot {
  start_time: string
  end_time: string
}

export interface DayAvailability {
  day: string
  slots: AvailabilitySlot[]
}

export type AvailabilityPayload = DayAvailability[]

export interface AvailabilitySlotResponse {
  id: number
  day_name: string
  slots: AvailabilitySlot[]
}

export interface AvailabilityResponse {
  success: boolean
  message: string
  data?: AvailabilitySlotResponse[]
}

export const getAvailabilitySlots = async (): Promise<AvailabilityResponse> => {
  try {
    const url = apiEndpoints.availabilitySlots()
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    throw error
  }
}

export const saveAvailabilitySlots = async (data: AvailabilityPayload): Promise<AvailabilityResponse> => {
  try {
    const url = apiEndpoints.availabilitySlots()
    const response = await axiosClient.post(url, data)

    return response.data
  } catch (error) {
    throw error
  }
}
