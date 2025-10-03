'use client'

import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { onboardingRoutes } from '@/constants'

interface GlobalLoaderProps {
  children: React.ReactNode
}

const GlobalLoader = ({ children }: GlobalLoaderProps) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const isOnboardingRoute = onboardingRoutes?.some(route => pathname?.startsWith(route))

  useEffect(() => {
    if (isOnboardingRoute) {
      setLoading(false)

      return
    }

    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 1000)

    return () => clearTimeout(timeout)
  }, [pathname, isOnboardingRoute])
  return (
    <>
      {loading && !isOnboardingRoute && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[200]'>
          <div className='flex flex-col items-center justify-center'>
            <img src='/logo.gif' alt='Loading...' className='size-40 object-contain' />
          </div>
        </div>
      )}
      {children}
    </>
  )
}

export default GlobalLoader
