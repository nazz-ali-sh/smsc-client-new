import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getMeWithOnboarding } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'

export const useRmcOnboardingData = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['me-with-onboarding'],
    queryFn: getMeWithOnboarding,
    retry: 2,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['me-with-onboarding']
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
