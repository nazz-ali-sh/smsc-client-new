'use client'

import { withPortalCheck } from '@/components/hoc/withPortalCheck'
import InviteSiteVisitView from '@/views/inviteSiteVisits.tsx/InviteSiteVisitView '
import PmaInviteSiteVisitView from '@/views/inviteSiteVisits.tsx/PmaInviteSiteVisitView'

const PmaSiteVisits = () => {
  return <PmaInviteSiteVisitView />
}

const RmcSiteVisits = () => {
  return <InviteSiteVisitView />
}

const SiteVisitsContent = withPortalCheck(PmaSiteVisits, RmcSiteVisits)

export default function Page() {
  return <SiteVisitsContent />
}
