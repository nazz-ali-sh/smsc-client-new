'use client'

import InviteSiteVisitView from '@/views/inviteSiteVisits.tsx/InviteSiteVisitView'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'

const PmaSiteVisits = () => {
  return (
    <div className='flex items-center justify-center'>
      <h1 className='text-4xl font-bold text-gray-800'>PMA Site Visits Coming Soon</h1>
    </div>
  )
}

const RmcSiteVisits = () => {
  return <InviteSiteVisitView />
}

const SiteVisitsContent = withPortalCheck(PmaSiteVisits, RmcSiteVisits)

export default function Page() {
  return <SiteVisitsContent />
}
