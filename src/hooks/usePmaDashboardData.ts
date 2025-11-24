import { useQuery } from '@tanstack/react-query'

import { getPmaDashboardData } from '@/services/dashboard-apis/dashboard-api'

interface UsePmaDashboardDataProps {
  filter?: 'active_offices' | 'active_users'
}

export const usePmaDashboardData = ({ filter }: UsePmaDashboardDataProps = {}) => {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['pmaDashboardData', filter],
    queryFn: () => getPmaDashboardData(filter),
    enabled: !!filter,
    retry: 2
  })

  return {
    dashboardData,
    isLoading,
    isError,
    error
  }
}
