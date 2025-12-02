import axiosClient from '../../utils/axiosInstance'
import { apiEndpoints } from '../../utils/apisEndpoints'

export const tenderResponce = async (tender_id: number) => {
  try {
    const url = apiEndpoints.getTenderResult(tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const ShortlistedPma = async (tender_id: number, pma_user_ids: number[] | number) => {
  try {
    const url = apiEndpoints.selectShortListpma()

    const payload = {
      tender_id,
      pma_user_ids: pma_user_ids
    }

    console.log('Sending Payload:', payload)

    // Pass the payload as the second argument to the POST request
    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const finalShortListedAgent = async (tender_id: number) => {
  try {
    const url = apiEndpoints.finalShortList(tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const downloadBlindTenderPdf = async (tender_id: number) => {
  try {
    const url = apiEndpoints.gettingBlindTenderPdf(tender_id)

    const response = await axiosClient.get(url, {
      responseType: 'blob', // 👈 ensure PDF is returned as Blob
      headers: {
        Accept: 'application/pdf'
      }
    })

    return response.data as Blob // ✅ return Blob directly
  } catch (error) {
    console.error('Tender Response API error:', error)
    throw error
  }
}

export const downloadTenderReportPdf = async (tender_id: number, type: 'blind' | 'final_report') => {
  try {
    const url = `/rmc/reports/pdf?tender_id=${tender_id}&type=${type}`

    const response = await axiosClient.get(url, {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf'
      }
    })

    return response.data as Blob
  } catch (error) {
    console.error(`Tender PDF download API error for type ${type}:`, error)
    throw error
  }
}

export const getPmaCompanyDetails = async (user_id: number, type?: string) => {
  try {
    const query = type ? `&type=${encodeURIComponent(type)}` : ''
    const url = `rmc/pma-company-detail?pma_id=${user_id}${query}`

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Response API error:', error)
    throw error
  }
}

// getting Available Slots :

export const getSlots = async () => {
  try {
    const url = apiEndpoints.getAvailableSlots

    console.log('Generated URL:', url)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const getSlotsAndDay = async (date: any) => {
  try {
    const url = apiEndpoints.gettingSlots(date)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

//  Site Visit Calander Slot
export const sideVisitCalendarSlots = async (date: any) => {
  try {
    const url = apiEndpoints.gettingSideInvitesSlots(date)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const videoCallsInvite = async (
  date: string,
  day_id: number,
  slot_id: any,
  pma_user_ids: number[] | number,
  message: string,
  tender_id: number
) => {
  try {
    const url = apiEndpoints.rmcVideoCallInvite()

    const payload = {
      date,

      // tender_id: 7,
      day_id,
      slot_id,
      pma_user_ids,
      message,
      tender_id
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const SideVisitInvite = async (
  date: string,
  day_id: number,
  slot_id: any,
  pma_user_ids: number[] | number,
  message: string,
  tender_id: number,
  location: string
) => {
  try {
    const url = apiEndpoints.rmcSideVisitInvite()

    const payload = {
      date,

      // tender_id: 7,
      day_id,
      slot_id,
      pma_user_ids,
      message,
      tender_id,
      location
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

export const getrmcshortlistStats = async (tender_id: number) => {
  try {
    const url = apiEndpoints.gettingrmcshortlistStats(tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const gettingRmcAppoint = async (
  pma_user_id: number,
  appointment_message: string,
  other_pma_feedbacks: { pma_user_id: number; feedback: string }[],
  tender_id: number
) => {
  try {
    const url = apiEndpoints.rmcAppintRmc(tender_id)

    const payload = {
      pma_user_id,
      appointment_message,
      other_pma_feedbacks
    }

    console.log('Sending Payload:', payload)

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('RMC appoint API error:', error)
    throw error
  }
}

export const rmcsendContactpma = async (pma_user_id: number, message: string) => {
  try {
    const url = apiEndpoints.rmcShortlistContact

    const payload = {
      pma_user_id,
      message
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const rmcExtendThreeDays = async (tender_id: number, pma_user_id: number) => {
  try {
    const url = apiEndpoints.rmcExtendDays(tender_id)

    const payload = {
      pma_user_id
    }

    const response = await axiosClient.post(url, payload)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

// Get saved evaluation data
export const getSavedEvaluationData = async (tender_id: number) => {
  try {
    const url = `/rmc/evaluation-matrix/scores?tender_id=${tender_id}`
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Get saved evaluation data API error:', error)
    throw error
  }
}

export const shortlistedPmas = async (tender_id: number) => {
  try {
    if (!tender_id || tender_id === undefined || tender_id === null || isNaN(tender_id)) {
      throw new Error('Invalid tender ID provided')
    }

    const url = apiEndpoints.gettingAllShortlistedPma(tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}
