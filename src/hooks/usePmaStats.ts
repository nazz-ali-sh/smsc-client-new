import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPmaStats } from '@/services/pma-tender-listing-apis/pma-stats-api'

export const usePmaStats = () => {
  const queryClient = useQueryClient()

  const pmaStatsQuery = useQuery({
    queryKey: ['pmaStats'],
    queryFn: () => getPmaStats(),
    retry: 2
  })

  const invalidatePmaStatsCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['pmaStats']
    })
  }

  return {
    pmaStatsData: pmaStatsQuery?.data,
    isPmaStatsLoading: pmaStatsQuery?.isLoading,
    pmaStatsError: pmaStatsQuery?.error,
    refetchPmaStats: pmaStatsQuery?.refetch,
    invalidatePmaStatsCache,
    isLoading: pmaStatsQuery?.isLoading,
    isError: !!pmaStatsQuery?.error
  }
}

