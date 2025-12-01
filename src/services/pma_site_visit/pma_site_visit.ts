import { apiEndpoints } from '@/utils/apisEndpoints'
import axiosClient from '@/utils/axiosInstance'

export const pamSiteVisit = async (status: string) => {
  try {
    const url = apiEndpoints.pmaSiteVisitInvites(status)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const pmaSideVisitAccept = async (invite_id: number, tender_id: number) => {
  try {
    const url = apiEndpoints.pmaSiteVisitAccepted()

    const payload = {
      invite_id,
      tender_id
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const pmaSiteVisitReschedual = async (
  invite_id: number,
  tender_id: number,
  date: string,
  day_id: number,
  slot_id: number,
  message: string
) => {
  try {
    const url = apiEndpoints.pmaSiteVisitReschedual()

    const payload = {
      invite_id,
      tender_id,
      date,
      day_id,
      slot_id,
      message
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const pmaAllAvailableSlots = async (invite_id: number, date: any) => {
  try {
    const url = apiEndpoints.pmaSlotAvailability()

    const payload = {
      invite_id,
      date
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}


export const pmagettingCalanderDates = async (
  status: string,
  type: string,
  month: string,
  date: string
) => {
  try {
    const url = apiEndpoints.PmaCalanderData( status, type, month, date)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}
