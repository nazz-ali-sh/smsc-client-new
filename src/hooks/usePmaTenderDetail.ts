import { useQuery } from '@tanstack/react-query'

import { getPmaTenderDetail } from '@/services/pma-tender-listing-apis/pma-tender-detail-api'

interface UsePmaTenderDetailProps {
  tenderId: number | null
}

export const usePmaTenderDetail = ({ tenderId }: UsePmaTenderDetailProps) => {
  const {
    data: tenderDetailData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['pmaTenderDetail', tenderId],
    queryFn: () => getPmaTenderDetail(tenderId!),
    enabled: !!tenderId,
    retry: 2
  })

  return {
    tenderDetailData,
    isLoading,
    isError,
    error
  }
}
