import { apiEndpoints } from '@/utils/apisEndpoints'
import axiosClient from '@/utils/axiosInstance'

export const rmcSiteVisitDetails = async (status: string, tender_id: number) => {
  try {
    const url = apiEndpoints.rmcSiteVisit(status, tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const rmcVideoCallDetails = async (status: string, tender_id: number) => {
  try {
    const url = apiEndpoints.rmcVideoCallsInvite(status, tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const rmcReSchedualAgain = async (
  invite_id: number,
  tender_id: number,
  date: string,
  day_id: number,
  slot_id: number,
  message: string
) => {
  try {
    const url = apiEndpoints.rmcSchedualAgain()

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

export const rmcSideVisitInvites = async (
  invite_id: number,
  tender_id: number,
  date: string,
  day_id: number,
  slot_id: number,
  message: string
) => {
  try {
    const url = apiEndpoints.rmcsiteVisitSchedualAgain()

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

//  vidoe call Reject
export const reSchedualRejectInvite = async (invite_id: number, tender_id: number, message: string) => {
  try {
    const url = apiEndpoints.rmcRejectInvite()

    const payload = {
      invite_id,
      tender_id,
      message
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

//  videoCancel
export const rmcVideoCallsCancel = async (invite_id: number, tender_id: number, message: string) => {
  try {
    const url = apiEndpoints.rmcVideoCallCancel()

    const payload = {
      invite_id,
      tender_id,
      message
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const rmcSiteVisitRejected = async (invite_id: number, tender_id: number, message: string) => {
  try {
    const url = apiEndpoints.rmcSiteVisityRejectInvite()

    const payload = {
      invite_id,
      tender_id,
      message
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

//  cancel
export const rmcSiteVisitCancel = async (invite_id: number, tender_id: number, message: string) => {
  try {
    const url = apiEndpoints.rmcSiteVisitCancelled()

    const payload = {
      invite_id,
      tender_id,
      message
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const reSchedualAccepted = async (invite_id: number, tender_id: number) => {
  try {
    const url = apiEndpoints.rmcAcceptRechedual()

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

//  accept side invite

export const rmcSideVisitAccept = async (invite_id: number, tender_id: number) => {
  try {
    const url = apiEndpoints.rmcSiteVisitAcceptReschedual()

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
