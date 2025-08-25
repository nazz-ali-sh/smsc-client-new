'use client'
import { useState, type SetStateAction } from 'react'

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
  const [dataFromsubChild, setDataFromSubChild] = useState('')

  function handleDataFromSubChild(data: SetStateAction<string>) {
    setDataFromSubChild(data)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['companyDetails', params.id, dataFromsubChild],
    queryFn: () => getPmaCompanyDetails(Number(params.id), dataFromsubChild)
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
            <EventDetails userData={data} handleDataFromSubChild={handleDataFromSubChild} />
          </Grid>
        </Grid>
      </section>
    </div>
  )
}
