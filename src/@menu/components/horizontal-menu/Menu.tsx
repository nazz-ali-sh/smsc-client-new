'use client'

import { createContext, forwardRef, useMemo, useState } from 'react'
import type { ForwardRefRenderFunction, MenuHTMLAttributes, ReactElement } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSelector } from 'react-redux'
import { FloatingTree } from '@floating-ui/react'

import { routesWithNavbarContent, pmaRoutes, rmcRoutes } from '@/constants'
import CustomTooltip from '@/common/CustomTooltip'
import { getUserType } from '@/utils/tokenSync'
import { isPmaPortalAndUser } from '@/utils/portalHelper'
import type { MenuProps as VerticalMenuProps } from '../vertical-menu/Menu'
import type {
  ChildrenType,
  MenuItemStyles,
  RenderExpandIconParams,
  RenderExpandedMenuItemIcon,
  RootStylesType
} from '../../types'
import { horizontalSubMenuToggleDuration } from '../../defaultConfigs'
import HorizontalMenuPopOver from './HorizontalMenuPopOver'
import { pmaMenuData, rmcMenuData } from '@/constants/headerOptions'

export type HorizontalMenuContextProps = {
  triggerPopout?: 'hover' | 'click'
  browserScroll?: boolean
  menuItemStyles?: MenuItemStyles
  renderExpandIcon?: (params: RenderExpandIconParams) => ReactElement
  renderExpandedMenuItemIcon?: RenderExpandedMenuItemIcon
  transitionDuration?: number
  popoutMenuOffset?: {
    mainAxis?: number | ((params: { level?: number }) => number)
    alignmentAxis?: number | ((params: { level?: number }) => number)
  }
  textTruncate?: boolean
  verticalMenuProps?: Pick<
    VerticalMenuProps,
    | 'transitionDuration'
    | 'menuSectionStyles'
    | 'menuItemStyles'
    | 'subMenuOpenBehavior'
    | 'renderExpandIcon'
    | 'renderExpandedMenuItemIcon'
    | 'textTruncate'
    | 'rootStyles'
  >
}

export type MenuProps = HorizontalMenuContextProps &
  RootStylesType &
  Partial<ChildrenType> &
  MenuHTMLAttributes<HTMLMenuElement>

export const HorizontalMenuContext = createContext({} as HorizontalMenuContextProps)

const Menu: ForwardRefRenderFunction<HTMLMenuElement, MenuProps> = props => {
  const {
    menuItemStyles,
    triggerPopout = 'hover',
    browserScroll = false,
    transitionDuration = horizontalSubMenuToggleDuration,
    renderExpandIcon,
    renderExpandedMenuItemIcon,
    popoutMenuOffset = { mainAxis: 0 },
    textTruncate = true,
    verticalMenuProps
  } = props

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)
  const hasTenderId = tender_id && tender_id !== null && tender_id !== undefined

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const userType = getUserType()
  const isPmaUser = isPmaPortalAndUser(userType)

  const menuData = isPmaUser ? pmaMenuData : rmcMenuData

  const pathname = usePathname()

  const isOnboardingRoute =
    routesWithNavbarContent?.some(route => pathname?.includes(route)) ||
    pmaRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
    rmcRoutes.some(route => pathname === route || pathname.startsWith(route))

  const providerValue = useMemo(
    () => ({
      triggerPopout,
      browserScroll,
      menuItemStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      transitionDuration,
      popoutMenuOffset,
      textTruncate,
      verticalMenuProps
    }),
    [
      triggerPopout,
      browserScroll,
      menuItemStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      transitionDuration,
      popoutMenuOffset,
      textTruncate,
      verticalMenuProps
    ]
  )

  return (
    <HorizontalMenuContext.Provider value={providerValue}>
      <FloatingTree>
        <div
          className={`flex items-center justify-center ${
            isOnboardingRoute ? 'gap-x-[13px]' : 'gap-x-[20px]'
          } min-w-[1300px] w-full`}
        >
          {menuData.map((items, index) => {
            const isDisabled = isPmaUser ? false : !items.alwaysEnabled && !hasTenderId

            const isActive = isPmaUser
              ? pathname === items.href || (items.isInvite && pathname === '/calendar')
              : pathname === items.href ||
                (items.isInvite && ['/site-visits', '/video-calls', '/calendar'].some(p => pathname.startsWith(p)))

            if (items.isInvite) {
              return (
                <div key={index} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <div
                    className={`flex items-center justify-center py-2 rounded-lg min-w-[140px] ${
                      isActive ? 'bg-[#35C0ED] text-white' : ''
                    } ${isDisabled ? 'cursor-default pointer-events-none' : 'cursor-pointer'}`}
                  >
                    <section className='flex gap-x-[8px] px-3'>
                      <div className='size-[22px]' style={{ color: 'inherit' }}>
                        {items.image}
                      </div>
                      <div className='text-[15px]'>{items.menuItem}</div>
                    </section>
                  </div>

                  <HorizontalMenuPopOver open={open} anchorEl={anchorEl} handlePopoverClose={handlePopoverClose} />
                </div>
              )
            }

            const menuItem = (
              <Link
                key={index}
                href={isDisabled ? '#' : (items.href ?? '#')}
                onClick={e => {
                  if (isDisabled) e.preventDefault()
                }}
                className={`flex items-center ${isActive ? 'bg-[#35C0ED] text-white' : ''} ${
                  isDisabled ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                } justify-center py-2 rounded-lg ${isPmaUser ? 'min-w-[185px]' : 'min-w-[140px]'}`}
              >
                <section className='flex gap-x-[8px] px-3'>
                  <div className='size-[22px]' style={{ color: 'inherit' }}>
                    {items.image}
                  </div>
                  <div className='text-[15px]'>{items.menuItem}</div>
                </section>
              </Link>
            )

            return isDisabled && !isPmaUser ? (
              <CustomTooltip
                key={index}
                text='Finish Onboarding to access these tabs'
                align='left'
                position='left'
                cursor='default'
              >
                {menuItem}
              </CustomTooltip>
            ) : (
              menuItem
            )
          })}
        </div>
      </FloatingTree>
    </HorizontalMenuContext.Provider>
  )
}

export default forwardRef(Menu)
