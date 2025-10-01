'use client'

import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import CustomLoader from '@/common/CustomLoader'

interface GlobalLoaderProps {
  children: React.ReactNode
}

const GlobalLoader = ({ children }: GlobalLoaderProps) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const onboardingRoutes = [
    '/rmc-onboarding',
    '/rmc-onboarding-address',
    '/rmc-onboarding-blocks',
    '/rmc-onboarding-budget',
    '/rmc-onboarding-buildings',
    '/rmc-onboarding-details',
    '/rmc-onboarding-director',
    '/rmc-onboarding-five',
    '/rmc-onboarding-four',
    '/rmc-onboarding-leaseholder',
    '/rmc-onboarding-open',
    '/rmc-onboarding-otp',
    '/rmc-onboarding-postcode',
    '/rmc-onboarding-priorities',
    '/rmc-onboarding-questions',
    '/rmc-onboarding-resident',
    '/rmc-onboarding-rtm',
    '/rmc-onboarding-second',
    '/rmc-onboarding-spaces',
    '/rmc-onboarding-third',
    '/rmc-onboarding-verification',
    '/tender-information-update'
  ]

  const isOnboardingRoute = onboardingRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    if (isOnboardingRoute) {
      setLoading(false)

      return
    }

    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500)

    return () => clearTimeout(timeout)
  }, [pathname, isOnboardingRoute])

  return (
    <>
      {loading && !isOnboardingRoute && (
        <div className='fixed inset-0 flex items-center justify-center  z-50'>
          <CustomLoader size='large' />
        </div>
      )}
      {children}
    </>
  )
}

export default GlobalLoader
