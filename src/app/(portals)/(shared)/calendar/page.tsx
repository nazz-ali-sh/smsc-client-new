'use client'

import RmcCalendar from '@/views/RmcCalendar/RmcCalendar'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'
import PmaCalendar from '@/views/PmaCalendar/PmaCalendar'

const RmcCalendarPage = () => {
  return <RmcCalendar />
}

const CalendarContent = withPortalCheck(PmaCalendar, RmcCalendarPage)

export default function Page() {
  return <CalendarContent />
}
