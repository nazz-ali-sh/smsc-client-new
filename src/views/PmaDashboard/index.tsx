'use client'

import PmaDashboardView from './PmaDashboardView'
import type { PmaStatsType } from '@/views/PmaTenderListing/types'

const dummyStatsData: PmaStatsType = {
  pma_number: 'PMA-2024-001',
  pma_id: 1,
  pma_name: 'Premium Property Management Ltd',
  active_offices: 3,
  active_users: 5,
  sub_user_visibility: true,
  responses_sent_to: 12,
  shortlisted_for_tender: 8,
  tender_won: 3
}

const PmaDashboard = () => {
  return <PmaDashboardView statsData={dummyStatsData} />
}

export default PmaDashboard
