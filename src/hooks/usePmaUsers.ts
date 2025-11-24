import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { getPmaUsers } from '@/services/pma-user-management-apis/pma-user-management-apis'

export const usePmaUsers = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['pma-users'],
    queryFn: async () => {
      try {
        const response = await getPmaUsers()

        return response.data
      } catch (error: any) {
        toast.error('Failed to load users')
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
      queryKey: ['pma-users']
    })
  }

  return {
    ...query,
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    invalidateCache
  }
}
