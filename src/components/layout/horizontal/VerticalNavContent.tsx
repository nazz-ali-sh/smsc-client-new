import React, { useRef } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { styled } from '@mui/material/styles'

import PerfectScrollbar from 'react-perfect-scrollbar'

import { useSelector } from 'react-redux'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

import NavHeader from '@menu/components/vertical-menu/NavHeader'
import Logo from '@components/layout/shared/Logo'
import NavCollapseIcons from '@menu/components/vertical-menu/NavCollapseIcons'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'

import { mapHorizontalToVerticalMenu } from '@menu/utils/menuUtils'
import { getLocalizedUrl } from '@/utils/i18n'

const StyledBoxForShadow = styled('div')(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(var(--mui-palette-background-default) ${
    theme.direction === 'rtl' ? '95%' : '5%'
  }, rgb(var(--mui-palette-background-defaultChannel) / 0.85) 30%, rgb(var(--mui-palette-background-defaultChannel) / 0.5) 65%, rgb(var(--mui-palette-background-defaultChannel) / 0.3) 75%, transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const VerticalNavContent = ({ children }: ChildrenType) => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()
  const { lang: locale } = useParams()
  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  // Refs
  const shadowRef = useRef(null)

  // Vars
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar
  const hasTenderId = tender_id && tender_id !== null && tender_id !== undefined

  const scrollMenu = (container: any, isPerfectScrollbar: boolean) => {
    container = isBreakpointReached || !isPerfectScrollbar ? container.target : container

    if (shadowRef && container.scrollTop > 0) {
      // @ts-ignore
      if (!shadowRef.current.classList.contains('scrolled')) {
        // @ts-ignore
        shadowRef.current.classList.add('scrolled')
      }
    } else {
      // @ts-ignore
      shadowRef.current.classList.remove('scrolled')
    }
  }

  return (
    <>
      {!isBreakpointReached && (
        <NavHeader>
          <Link href={getLocalizedUrl('/', locale as Locale)}>
            <Logo />
          </Link>
          <NavCollapseIcons />
        </NavHeader>
      )}
      <StyledBoxForShadow ref={shadowRef} />
      <ScrollWrapper
        {...(isBreakpointReached
          ? {
              className: 'bs-full overflow-y-auto overflow-x-hidden',
              onScroll: container => scrollMenu(container, false)
            }
          : {
              options: { wheelPropagation: false, suppressScrollX: true },
              onScrollY: container => scrollMenu(container, true)
            })}
      >
        {React.Children.map(mapHorizontalToVerticalMenu(children), (child: any) => {
          if (child && child.props) {
            const { href } = child.props

            const isDisabled =
              !href || href === '#' || (!href.includes('/dashboard') && !href.includes('/insurance') && !hasTenderId)

            return React.cloneElement(child, {
              disabled: isDisabled,
              href: isDisabled ? '#' : href
            })
          }

          return child
        })}
      </ScrollWrapper>
    </>
  )
}

export default VerticalNavContent
