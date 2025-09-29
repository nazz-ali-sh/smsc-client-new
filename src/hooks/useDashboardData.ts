import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { getDashboardData } from '@/services/dashboard-apis/dashboard-api'
import type { RootState } from '@/redux-store'

export const useDashboardData = () => {
  const queryClient = useQueryClient()
  const tender_id = useSelector((state: RootState) => state?.rmcOnboarding?.tenderId)

  const query = useQuery({
    queryKey: ['dashboard-data', tender_id],
    queryFn: () => getDashboardData(tender_id!),
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!tender_id
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['dashboard-data', tender_id]
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
