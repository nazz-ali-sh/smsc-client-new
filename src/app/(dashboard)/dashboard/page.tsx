'use client'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import { dashboardData } from '@/services/dashboard-apis/dashboard-api'
import AccordionExpand from '@/views/Dashboard/AccordionExpand'
import CurrentActivity from '@/views/Dashboard/CurrentActivity'
import { TenderCards } from '@/views/Dashboard/PopularInstructors'
import WeeklyReport from '@/common/WeeklyReport'
import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'

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
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { data: dashboardResponce, isLoading: isDashboardLoading } = useQuery<DashboardResponse, Error>({
    queryKey: ['dashboardDatas', tenderId],
    queryFn: () => dashboardData(Number(tenderId)),
    enabled: !!tenderId,
    retry: 2
  })


  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text={'Welcome Back'} />
      </section>

      <section className='py-4'>
        <HorizontalLinearStepper />
      </section>
      <div className='mt-3'>
        <TenderCards dashboardResponce={dashboardResponce} isLoading={isDashboardLoading} />
      </div>

      <div className='mt-[36px]'>
        <CurrentActivity dashboardResponce={dashboardResponce} />
      </div>
      <div className='mt-[70px] mb-[60px]'>
        <AccordionExpand />
      </div>
    </>
  )
}
