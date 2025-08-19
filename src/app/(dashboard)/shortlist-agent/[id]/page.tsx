'use client'
import { Grid } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import EventDetails from '@/views/dynamicShortlist/EventDetails'
import UserProfile from '@/views/dynamicShortlist/UserProfile'
import { getPmaCompanyDetails } from '@/services/tender_result-apis/tender-result-api'

interface PageProps {
  params: {
    id: string
  }
}

export default function AgentDetail({ params }: PageProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['companyDetails', params.id],
    queryFn: () => getPmaCompanyDetails(Number(params.id))
  })

  if (isLoading) {
    return <div>Loading company details...</div>
  }

  if (isError) {
    return <div>Error fetching data: {error.message}</div>
  }

  return (
    <div>
      <section>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={3} md={5}>
            <UserProfile userData={data} />
          </Grid>
          <Grid item xs={12} lg={9} md={7}>
            <EventDetails userData={data} />
          </Grid>
        </Grid>
      </section>
    </div>
  )
}
