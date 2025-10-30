import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPmaOnboardingData } from '@/services/pma-onboarding-apis/pma-onboarding-api'
import { getUserType } from '@/utils/tokenSync'
import { isPmaPortalAndUser } from '@/utils/portalHelper'

export const usePmaOnboardingData = () => {
  const userType = getUserType()
  const isPmaPortal = isPmaPortalAndUser(userType)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['pma-onboarding-details'],
    queryFn: getPmaOnboardingData,
    retry: 2,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!isPmaPortal
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
