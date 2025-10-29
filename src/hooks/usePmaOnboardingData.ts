import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPmaOnboardingData } from '@/services/pma-onboarding-apis/pma-onboarding-api'

export const usePmaOnboardingData = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['pma-onboarding-details'],
    queryFn: getPmaOnboardingData,
    retry: 2,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['pma-onboarding-details'] })
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
