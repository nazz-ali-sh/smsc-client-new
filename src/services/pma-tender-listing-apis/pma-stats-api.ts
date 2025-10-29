import axiosClient from '@/utils/axiosInstance'

export const getPmaStats = async () => {
  try {
    const url = 'pma/stats'
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('PMA Stats API error:', error)
    throw error
  }
}

