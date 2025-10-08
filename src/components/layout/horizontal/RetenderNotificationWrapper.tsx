'use client'

import { usePathname } from 'next/navigation'

import RetenderNotification from '@/common/RetenderNotification'
import { useDashboardData } from '@/hooks/useDashboardData'

const RetenderNotificationWrapper = () => {
  const pathname = usePathname()
  const { data: dashboardData } = useDashboardData()

  const isOnboardingRoute = pathname.includes('rmc-onboarding')

  const isAuthRoute =
    pathname.includes('/login') || pathname.includes('/forgot-password') || pathname.includes('/reset-password')

  if (isOnboardingRoute || isAuthRoute) {
    return null
  }

  if (!dashboardData) {
    return null
  }

  const tenderResponseCount = dashboardData?.tender_response_count
  const isResponseCountValid = tenderResponseCount >= 1 && tenderResponseCount <= 6

  const today = new Date()
  const tenderEndDate = new Date(dashboardData?.tender_end_date?.date)
  const isPastTenderEndDate = today > tenderEndDate

  if (!isResponseCountValid || !isPastTenderEndDate) {
    return null
  }

  return (
    <RetenderNotification
      title='Not getting enough replies?'
      description="We've noticed this tender has received fewer than 3 responses. To increase your chances of success, you can re-tender Your Block."
      buttonText='Re-Tender'
      showModal={true}
      tenderId='TND-xxxx'
      icon='📢'
    />
  )
}

export default RetenderNotificationWrapper
