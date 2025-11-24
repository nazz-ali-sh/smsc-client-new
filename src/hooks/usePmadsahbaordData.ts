import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPmadsahbaordStats } from '@/services/dashboard-apis/dashboard-api'

export const usePmadsahbaordData = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['pmadsahbaord-stats'],
    queryFn: () => getPmadsahbaordStats(),
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: true
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['pmadsahbaord-stats']
    })
  }

  return {
    ...query,
    data: query?.data,
    isLoading: query?.isLoading,
    error: query?.error,
    refetch: query?.refetch,
    invalidateCache
  }
}
