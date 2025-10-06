'use client'

import { usePathname } from 'next/navigation'

import RmcOnboardingHeader from '@/common/RmcOnboardingHeader'
import NavbarContent from './NavbarContent'
import Navigation from './Navigation'
import Navbar from '@layouts/components/horizontal/Navbar'
import LayoutHeader from '@layouts/components/horizontal/Header'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { routesWithNavbarContent } from '@/constants'

const ConditionalOnboardingHeader = () => {
  const pathname = usePathname()
  const { isBreakpointReached } = useHorizontalNav()

  const shouldShowNavbarContent = routesWithNavbarContent?.some(route => pathname?.includes(route))

  if (shouldShowNavbarContent) {
    return (
      <>
        <LayoutHeader>
          <Navbar>
            <NavbarContent />
          </Navbar>
          {!isBreakpointReached && <Navigation />}
        </LayoutHeader>
        {isBreakpointReached && <Navigation />}
      </>
    )
  }

  return <RmcOnboardingHeader />
}

export default ConditionalOnboardingHeader
