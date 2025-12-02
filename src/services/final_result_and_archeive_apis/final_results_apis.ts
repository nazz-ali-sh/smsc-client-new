import { apiEndpoints } from '@/utils/apisEndpoints'
import axiosClient from '@/utils/axiosInstance'

export const fianlResults = async (tender_id: number) => {
  try {
    const url = apiEndpoints.gettingFianlSelectionDetails(tender_id)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Tender Responce API error:', error)

    throw error
  }
}

export const archiveData = async (filter: string) => {
  try {
    const url = apiEndpoints.gettingAchiveData(filter)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}

// gettingArchiveDetails

export const archiveDetails = async (tender_id: number, pma_user_id?: number) => {
  try {
    const url = apiEndpoints.gettingArchiveDetails(tender_id, pma_user_id)
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('Archive Details', error)
    throw error
  }
}

export const downloadFinalSeectionPDf = async (tender_id: number) => {
  try {
    const url = apiEndpoints.gettingFinalSelectionPdf(tender_id)

    const response = await axiosClient.get(url, {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf'
      }
    })

    return response.data
  } catch (error) {
    console.error('Archive Details', error)
    throw error
  }
}


export const gettingCalanderDates = async (
  tender_id: number,
  status: string,
  type: string,
  month: string,
  date: string
) => {
  try {
    const url = apiEndpoints.gettingCalanderData(tender_id, status, type, month, date)

    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('RTM setup API error:', error)
    throw error
  }
}
