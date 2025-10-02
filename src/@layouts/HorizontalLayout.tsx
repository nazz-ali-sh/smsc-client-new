'use client'

import type { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import classnames from 'classnames'

import type { ChildrenType } from '@core/types'

import { HorizontalNavProvider } from '@menu/contexts/horizontalNavContext'

import LayoutContent from './components/horizontal/LayoutContent'
import { horizontalLayoutClasses } from './utils/layoutClasses'

import StyledContentWrapper from './styles/horizontal/StyledContentWrapper'

type HorizontalLayoutProps = ChildrenType & {
  header?: ReactNode
  footer?: ReactNode
}

const HorizontalLayout = (props: HorizontalLayoutProps) => {
  const { header, footer, children } = props
  const pathname = usePathname()
  const hideHeader = pathname.startsWith('/rmc-onboarding')
  const hideFooter = pathname.startsWith('/rmc-onboarding')

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
