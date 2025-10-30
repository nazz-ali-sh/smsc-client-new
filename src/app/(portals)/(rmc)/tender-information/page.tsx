'use client'

import WeeklyReport from '@/common/WeeklyReport'
import TenderInformationView from '@/views/TenderInformationUpdated'
import PmaTenderListing from '@/views/PmaTenderListing/PmaTenderListing'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'

const PmaTenderInformationView = () => {
  console.log('working')

  return <PmaTenderListing />
}

const RmcTenderInformationView = () => {
  return (
    <>
      {/* RMC */}
      <section className='flex w-full'>
        <WeeklyReport text={'Tender Information'} />
      </section>
      <TenderInformationView />
    </>
  )
}

const TenderInformationContent = withPortalCheck(PmaTenderInformationView, RmcTenderInformationView)

export default function Page() {
  return <TenderInformationContent />
}
