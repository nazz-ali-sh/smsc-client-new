'use client'

import React, { useEffect, useState } from 'react'

import { getUserType } from '@/utils/tokenSync'
import { isPmaPortalAndUser } from '@/utils/portalHelper'

export function withPortalCheck<P extends object>(
  PmaComponent: React.ComponentType<P>,
  RmcComponent: React.ComponentType<P>
) {
  return function PortalCheckWrapper(props: P) {
    const [shouldShowPmaComponent, setShouldShowPmaComponent] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const userType = getUserType()
      const shouldShowPma = isPmaPortalAndUser(userType)

      setShouldShowPmaComponent(shouldShowPma)
      setIsLoading(false)
    }, [])

    if (isLoading) {
      return null
    }

    if (shouldShowPmaComponent) {
      return <PmaComponent {...props} />
    }

    return <RmcComponent {...props} />
  }
}
