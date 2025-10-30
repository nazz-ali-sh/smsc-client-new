import axiosClient from '@/utils/axiosInstance'

export const getPmaTenderDetail = async (tenderId: number) => {
  const response = await axiosClient.get(`/pma/tender-detail/${tenderId}`)

  return response.data
}
