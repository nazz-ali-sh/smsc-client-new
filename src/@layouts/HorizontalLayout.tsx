'use client'

import type { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import classnames from 'classnames'

import type { ChildrenType } from '@core/types'

import { HorizontalNavProvider } from '@menu/contexts/horizontalNavContext'

import LayoutContent from './components/horizontal/LayoutContent'
import { horizontalLayoutClasses } from './utils/layoutClasses'

import StyledContentWrapper from './styles/horizontal/StyledContentWrapper'
import { rmcRoutes, pmaRoutes } from '@/constants'

type HorizontalLayoutProps = ChildrenType & {
  header?: ReactNode
  footer?: ReactNode
}

const HorizontalLayout = (props: HorizontalLayoutProps) => {
  const { header, footer, children } = props
  const pathname = usePathname()
  const isRmcRoute = rmcRoutes.some(route => pathname === route)
  const isPmaRoute = pmaRoutes.some(route => pathname === route || pathname.startsWith(route))
  const hideHeader = isRmcRoute || isPmaRoute
  const hideFooter = isRmcRoute || isPmaRoute

  return (
    <div className={classnames(horizontalLayoutClasses.root, 'flex flex-auto')}>
      <HorizontalNavProvider>
        <StyledContentWrapper className={classnames(horizontalLayoutClasses.contentWrapper, 'flex flex-col is-full')}>
          {!hideHeader && header} <LayoutContent>{children}</LayoutContent>
          {!hideFooter && footer}
        </StyledContentWrapper>
      </HorizontalNavProvider>
    </div>
  )
}

export default HorizontalLayout
