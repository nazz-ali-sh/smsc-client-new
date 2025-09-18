'use client'

import AccordionExpand from '@/views/Dashboard/AccordionExpand'
import CurrentActivity from '@/views/Dashboard/CurrentActivity'
import { TenderCards } from '@/views/Dashboard/PopularInstructors'
import WeeklyReport from '@/common/WeeklyReport'

export default function Page() {
  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text={'Welcome Back'} />
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
