import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import * as PmaBranchApi from '@/services/pma-branch-management-apis/pma-branch-management-apis'

export const usePmaBranches = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['pma-branches'],
    queryFn: async () => {
      try {
        const response = await PmaBranchApi.getAllPmaBranches()

        return response || []
      } catch (error: any) {
        toast.error('Failed to load branches')
        throw error
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })

  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['pma-branches']
    })
  }

  return {
    ...query,
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    invalidateCache
  }
}
