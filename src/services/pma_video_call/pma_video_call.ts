import { apiEndpoints } from '@/utils/apisEndpoints'
import axiosClient from '@/utils/axiosInstance'

export const pamvideoCall = async (status: string) => {
  try {
    const url = apiEndpoints.pmaVideoCallInvites(status)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const pmaVideoCallAccept = async (invite_id: number, tender_id: number) => {
  try {
    const url = apiEndpoints.pmaVideoCallAccepted()

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

export const pmaVideoCallsReschedual = async (
  invite_id: number,
  tender_id: number,
  date: string,
  day_id: number,
  slot_id: number,
  reason: string
) => {
  try {
    const url = apiEndpoints.pmaVideoCallReschedual()

    const payload = {
      invite_id,
      tender_id,
      date,
      day_id,
      slot_id,
      reason
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}
