import { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { setTenderInformation } from '@/redux-store/slices/tenderInformationSlice'

import { getMeWithOnboarding } from '@/services/rmc-onboarding-apis/rmc-onboarding-api'

export const useRmcOnboardingData = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const query = useQuery({
    queryKey: ['me-with-onboarding'],
    queryFn: getMeWithOnboarding,
    retry: 2,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    const onboarding = query?.data?.data

    if (!onboarding) return

    const status: string | undefined = onboarding?.status || onboarding?.step_progress?.status || undefined
    const current_step: number | undefined = onboarding?.step_progress?.current_step
    const onboarding_id: number | undefined = onboarding?.onboarding_id

    if (onboarding_id && current_step !== undefined) {
      dispatch(
        setTenderInformation({
          onboarding_id,
          status: status ?? 'in_progress',
          current_step
        })
      )
    }
  }, [dispatch, query?.data])

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
