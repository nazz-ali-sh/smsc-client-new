import axiosClient from '@/utils/axiosInstance'

export const getPmaTemplates = async () => {
  try {
    const url = 'pma/templates'
    const response = await axiosClient.get(url)

    return response.data
  } catch (error) {
    console.error('PMA Templates API error:', error)
    throw error
  }
}

