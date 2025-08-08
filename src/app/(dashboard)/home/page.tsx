'use client'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import type { RootState } from '@/redux-store'
import { dashboardData } from '@/services/dashboard-apis/dashboard-api'
import AccordionExpand from '@/views/Dashboard/AccordionExpand'
import CurrentActivity from '@/views/Dashboard/CurrentActivity'
import { TenderCards } from '@/views/Dashboard/PopularInstructors'
import WeeklyReport from '@/common/WeeklyReport'

interface Stage {
  stage: string
  display_name: string
  stage_number: number
  is_completed: boolean
  is_current: boolean
  completed_at: string | null
}

interface DashboardData {
  pma_count: number
  tender_response_count: number
  tender_expiry: string
  tender_progress: string
  schedule_calls: any | null
  shortlisted_pma: any | null
  tender_stage_progress?: {
    stages: Stage[]
  }
  tender_end_date?: {
    date: string
  }
}

interface DashboardResponse {
  success: boolean
  message: string
  tender_id: number
  data: DashboardData
}

export default function Page() {
  const rmcTenderId = useSelector((state: RootState) => state?.users?.tenderId)

  const { data: dashboardResponce, error } = useQuery<DashboardResponse, Error>({
    queryKey: ['dashboardDatas', rmcTenderId],
    queryFn: () => dashboardData(Number(rmcTenderId)),
    enabled: !!rmcTenderId,
    retry: false,
    refetchOnWindowFocus: false
  })

  // Handle loading and error states
  if (error) {
    console.error('Dashboard data error:', error)
  }

  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport dashboard dashboardResponce={dashboardResponce} />
      </section>
      <div className='mt-3'>
        <TenderCards />
      </div>

      <div className='mt-[36px]'>
        <CurrentActivity />
      </div>
      <div className='mt-[70px] mb-[60px]'>
        <AccordionExpand />
      </div>
    </>
  )
}
