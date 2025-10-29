import axiosClient from '@/utils/axiosInstance'

export const getPmaTendersList = async (filter: string) => {
  try {
    const url = `pma/tenders/list?filter=${filter}`
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('PMA Tenders List API error:', error)
    throw error
  }
}
