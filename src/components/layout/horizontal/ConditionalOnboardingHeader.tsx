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
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            width: '100%',
            zIndex: 1000,
            marginTop: '0',
            paddingTop: '0'
          }}
        >
          <LayoutHeader
            overrideStyles={{
              '& .ts-horizontal-layout-navbar': {
                maxWidth: 'none !important',
                width: '100% !important',
                paddingTop: '0 !important',
                marginTop: '0 !important'
              },
              '&': {
                maxWidth: 'none !important',
                width: '100% !important',
                margin: '0 !important',
                padding: '0 !important',
                paddingTop: '0 !important',
                marginTop: '0 !important'
              }
            }}
          >
            <Navbar>
              <NavbarContent />
            </Navbar>
            {!isBreakpointReached && <Navigation />}
          </LayoutHeader>
        </div>
        {isBreakpointReached && (
          <div style={{ position: 'fixed', top: '80px', left: '0', right: '0', zIndex: 1000 }}>
            <Navigation />
          </div>
        )}
        <div style={{ height: '120px' }} />
      </>
    )
  }

  return <RmcOnboardingHeader />
}

export default ConditionalOnboardingHeader
