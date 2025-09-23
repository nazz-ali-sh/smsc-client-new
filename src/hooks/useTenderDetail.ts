import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getTenderDetail } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'

export const useTenderDetail = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['tender-detail'],
    queryFn: () => getTenderDetail(),
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false

    // enabled: !!tender_id
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['tender-detail']
    })
  }

  // tender_id
  return {
    ...query,
    data: query?.data?.data,
    isLoading: query?.isLoading,
    error: query?.error,
    refetch: query?.refetch,
    invalidateCache
  }
}
