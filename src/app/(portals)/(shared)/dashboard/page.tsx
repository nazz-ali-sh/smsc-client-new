'use client'

import AccordionExpand from '@/views/Dashboard/AccordionExpand'
import CurrentActivity from '@/views/Dashboard/CurrentActivity'
import { TenderCards } from '@/views/Dashboard/PopularInstructors'
import WeeklyReport from '@/common/WeeklyReport'
import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'
import PmaDashboard from '@/views/PmaDashboard'

const PmaDashboardWrapper = () => {
  return <PmaDashboard />
}

const RmcDashboard = () => {
  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text={'Welcome Back'} />
      </section>

      <section className='py-4'>
        <HorizontalLinearStepper />
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

const DashboardContent = withPortalCheck(PmaDashboardWrapper, RmcDashboard)

export default function Page() {
  return <DashboardContent />
}
