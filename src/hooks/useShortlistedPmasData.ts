import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import type { RootState } from '@/redux-store'
import { shortlistedPmas } from '@/services/tender_result-apis/tender-result-api'

interface ShortlistedPmas {
  data?: any
}

export const useShortlistedPmas = () => {
  const queryClient = useQueryClient()
  const rmcTenderId = useSelector((state: RootState) => state?.rmcOnboarding?.tenderId)

  console.log(rmcTenderId, 'rmcTenderId')

  const query = useQuery<ShortlistedPmas, Error>({
    queryKey: ['shortlist', rmcTenderId],
    queryFn: () => {
      if (!rmcTenderId || rmcTenderId === undefined || rmcTenderId === null) {
        throw new Error('Tender ID is not available')
      }

      return shortlistedPmas(Number(rmcTenderId))
    },
    enabled: !!rmcTenderId && rmcTenderId !== undefined && rmcTenderId !== null,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const invalidateCaches = () => {
    queryClient.invalidateQueries({
      queryKey: ['shortlist', rmcTenderId]
    })
  }

  return {
    ...query,
    data: query?.data,
    isLoading: query?.isLoading,
    error: query?.error,
    refetch: query?.refetch,
    invalidateCaches
  }
}
