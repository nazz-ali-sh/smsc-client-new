'use client'

import { usePathname } from 'next/navigation'

import RetenderNotification from '@/common/RetenderNotification'
import { useDashboardData } from '@/hooks/useDashboardData'
import { rmcRoutes, pmaRoutes } from '@/constants'

const RetenderNotificationWrapper = () => {
  const pathname = usePathname()
  const { data: dashboardData } = useDashboardData()

  const isOnboardingRoute =
    rmcRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
    pmaRoutes.some(route => pathname === route || pathname.startsWith(route))

  const isAuthRoute =
    pathname.includes('/login') || pathname.includes('/forgot-password') || pathname.includes('/reset-password')

  if (isOnboardingRoute || isAuthRoute) {
    return null
  }

  if (!dashboardData) {
    return null
  }

  const tenderResponseCount = dashboardData?.data?.tender_response_count
  const isResponseCountValid = tenderResponseCount >= 1 && tenderResponseCount <= 6

  const today = new Date()
  const tenderEndDate = new Date(dashboardData?.data?.tender_end_date?.date)
  const isPastTenderEndDate = today > tenderEndDate

  const isAppointmentCompleted = dashboardData?.data?.tender_stage_progress?.stages?.appointment?.is_completed

  if (isAppointmentCompleted) {
    return null
  }

  if (!isResponseCountValid || !isPastTenderEndDate) {
    return null
  }

  return (
    <RetenderNotification
      title='Not getting enough replies?'
      description="We've noticed this tender has received fewer than 3 responses. To increase your chances of success, you can re-tender Your Block."
      buttonText='Re-Tender'
      showModal={!isAppointmentCompleted}
      tenderId='TND-xxxx'
      icon='📢'
    />
  )
}

export default RetenderNotificationWrapper
