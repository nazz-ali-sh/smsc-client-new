'use client'

import { Grid } from '@mui/material'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import EventDetails from '@/views/dynamicShortlist/EventDetails'
import UserProfile from '@/views/dynamicShortlist/UserProfile'
import { getPmaCompanyDetails } from '@/services/tender_result-apis/tender-result-api'
import type { RootState } from '@/redux-store'

interface PageProps {
  params: {
    id: string
  }
}

export default function AgentDetail({ params }: PageProps) {
  const activeTab = useSelector((state: RootState) => state?.tabSwitch?.activeTab)


  const { data, isLoading, isError } = useQuery({
    queryKey: ['companyDetails', params.id, activeTab],
    queryFn: () => getPmaCompanyDetails(Number(params.id), activeTab)
  })

  if (isLoading) {
    return <div className='flex justify-between items-center w-full'>Loading company details...</div>
  }

  if (isError) {
    return <div className='text-center'>Data Not Found </div>
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
