import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { getTenderDetail } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import type { RootState } from '@/redux-store'

export const useTenderDetail = () => {
  const queryClient = useQueryClient()
  const tender_id = useSelector((state: RootState) => state.rmcOnboarding.rmcData?.tender_id)

  const query = useQuery({
    queryKey: ['tender-detail', tender_id],
    queryFn: () => getTenderDetail(tender_id!),
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!tender_id
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['tender-detail', tender_id]
    })
  }

  return {
    ...query,
    data: query?.data?.data,
    isLoading: query?.isLoading,
    error: query?.error,
    refetch: query?.refetch,
    invalidateCache
  }
}
