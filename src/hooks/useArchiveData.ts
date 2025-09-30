import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { archiveData, archiveDetails } from '@/services/final_result_and_archeive_apis/final_results_apis'
import type { RootState } from '@/redux-store'

interface UseArchiveDataProps {
  filter?: string
  tenderId?: number
  pmaUserId?: number
}

export const useArchiveData = ({ filter = 'appoint', tenderId, pmaUserId }: UseArchiveDataProps = {}) => {
  const queryClient = useQueryClient()
  const tender_id = useSelector((state: RootState) => state.rmcOnboarding.tenderId)

  const archiveListQuery = useQuery({
    queryKey: ['AvailableSlotsAndDays', filter, tender_id],
    queryFn: () => archiveData(filter),
    enabled: !!filter,
    retry: 2
  })

  const archiveDetailsQuery = useQuery({
    queryKey: ['gettingVideoCallsDetails', tenderId, pmaUserId],
    queryFn: () => archiveDetails(tenderId!, pmaUserId),
    enabled: !!tenderId,
    retry: 2
  })

  const invalidateArchiveListCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['AvailableSlotsAndDays', filter, tender_id]
    })
  }

  const invalidateArchiveDetailsCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['gettingVideoCallsDetails', tenderId, pmaUserId]
    })
  }

  return {
    archiveListData: archiveListQuery?.data,
    isArchiveListLoading: archiveListQuery?.isLoading,
    archiveListError: archiveListQuery?.error,
    refetchArchiveList: archiveListQuery?.refetch,
    invalidateArchiveListCache,

    archiveDetailsData: archiveDetailsQuery?.data,
    isArchiveDetailsLoading: archiveDetailsQuery?.isLoading,
    archiveDetailsError: archiveDetailsQuery?.error,
    refetchArchiveDetails: archiveDetailsQuery?.refetch,
    invalidateArchiveDetailsCache,

    isLoading: archiveListQuery?.isLoading || archiveDetailsQuery?.isLoading,

    isError: !!archiveListQuery?.error || !!archiveDetailsQuery?.error
  }
}
