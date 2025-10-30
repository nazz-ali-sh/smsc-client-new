import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPmaTemplates } from '@/services/pma-tender-listing-apis/pma-templates-api'

export const usePmaTemplates = () => {
  const queryClient = useQueryClient()

  const pmaTemplatesQuery = useQuery({
    queryKey: ['pmaTemplates'],
    queryFn: () => getPmaTemplates(),
    retry: 2
  })

  const invalidatePmaTemplatesCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['pmaTemplates']
    })
  }

  return {
    pmaTemplatesData: pmaTemplatesQuery?.data,
    isPmaTemplatesLoading: pmaTemplatesQuery?.isLoading,
    pmaTemplatesError: pmaTemplatesQuery?.error,
    refetchPmaTemplates: pmaTemplatesQuery?.refetch,
    invalidatePmaTemplatesCache,
    isLoading: pmaTemplatesQuery?.isLoading,
    isError: !!pmaTemplatesQuery?.error
  }
}

