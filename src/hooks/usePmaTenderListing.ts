import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPmaTendersList } from '@/services/pma-tender-listing-apis/pma-tender-listing-api'

interface UsePmaTenderListingProps {
  filter?: string
}

export const usePmaTenderListing = ({ filter = 'went_live' }: UsePmaTenderListingProps = {}) => {
  const queryClient = useQueryClient()

  const tendersListQuery = useQuery({
    queryKey: ['pmaTendersList', filter],
    queryFn: () => getPmaTendersList(filter),
    enabled: !!filter,
    retry: 2
  })

  const invalidateTendersListCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['pmaTendersList', filter]
    })
  }

  return {
    tendersListData: tendersListQuery?.data,
    isTendersListLoading: tendersListQuery?.isLoading,
    tendersListError: tendersListQuery?.error,
    refetchTendersList: tendersListQuery?.refetch,
    invalidateTendersListCache,
    isLoading: tendersListQuery?.isLoading,
    isError: !!tendersListQuery?.error
  }
}
