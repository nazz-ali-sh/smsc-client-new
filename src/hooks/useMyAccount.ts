import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getMyAccount } from '@/services/auth-apis/auth-api'

export const useMyAccount = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['my-account'],
    queryFn: getMyAccount,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['my-account']
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
