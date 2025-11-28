import axiosClient from '@/utils/axiosInstance'

export const getPmaBranches = async () => {
  try {
    const response = await axiosClient.get('pma/branches/names')

    return response.data
  } catch (error) {
    console.error('Get PMA Branches API error:', error)
    throw error
  }
}

export const getPmaBranchById = async (id: number) => {
  try {
    const response = await axiosClient.get(`pma/branches/${id}`)

    return response.data
  } catch (error) {
    console.error('Get PMA Branch By ID API error:', error)
    throw error
  }
}
