'use client'

import { useRouter, usePathname } from 'next/navigation'

import { useSelector } from 'react-redux'

import RetenderNotification from '@/common/RetenderNotification'
import { getOnboardingRoute } from '@/utils/onboarding'

const ProfileCompletionNotificationWrapper = () => {
  const router = useRouter()
  const pathname = usePathname()
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const tenderInformation = useSelector((state: any) => state?.tenderInformation?.onboarding)
  const token = typeof window !== 'undefined' ? document.cookie.includes('token=') : false

  const isOnboardingRoute = pathname.includes('rmc-onboarding')

  const isAuthRoute =
    pathname.includes('/login') || pathname.includes('/forgot-password') || pathname.includes('/reset-password')

  if (!token) {
    return null
  }

  if (isOnboardingRoute || isAuthRoute) {
    return null
  }

  if (tenderId && tenderId !== null) {
    return null
  }

  const handleCompleteOnboarding = () => {
    const step = tenderInformation?.current_step
    const route = getOnboardingRoute(step)

    router.push(route)
  }

  return (
    <RetenderNotification
      title='Complete Your Profile'
      description="Your account is not yet active. You won't be able to launch any tender until your profile is complete. Please finish your setup."
      buttonText='Complete Onboarding'
      buttonAction={handleCompleteOnboarding}
      showModal={false}
      icon='⚠️'
    />
  )
}

export default ProfileCompletionNotificationWrapper
