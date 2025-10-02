'use client'

import { createContext, forwardRef, useMemo, useState } from 'react'
import type { ForwardRefRenderFunction, MenuHTMLAttributes, ReactElement } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import { usePathname } from 'next/navigation'

import { FloatingTree } from '@floating-ui/react'

import type { MenuProps as VerticalMenuProps } from '../vertical-menu/Menu'
import type {
  ChildrenType,
  MenuItemStyles,
  RenderExpandIconParams,
  RenderExpandedMenuItemIcon,
  RootStylesType
} from '../../types'

import { horizontalSubMenuToggleDuration } from '../../defaultConfigs'

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

  const [menuData] = useState([
    {
      image: <i className='ri-home-smile-line'></i>,
      menuItem: 'Dashboard',
      href: '/dashboard',
      alwaysEnabled: true
    },
    {
      image: <i className='ri-mail-open-line'></i>,
      menuItem: 'Tender Information',
      href: '/tender-information-update',
      alwaysEnabled: false
    },
    {
      image: <i className='ri-database-line'></i>,
      menuItem: 'Tender Results',
      href: '/tender-result',
      alwaysEnabled: false
    },
    {
      image: <i className='ri-pantone-line'></i>,
      menuItem: 'Shortlisted Agents',
      href: '/shortlist-agent',
      alwaysEnabled: false
    },
    {
      image: <i className='ri-file-list-2-line'></i>,
      menuItem: 'Invites',
      href: '/rmc-calendar',
      alwaysEnabled: false
    },
    {
      image: <i className='ri-pages-line'></i>,
      menuItem: 'Chats',
      href: '/chats',
      alwaysEnabled: false
    },
    {
      image: <i className='ri-bar-chart-2-line'></i>,
      menuItem: 'Final Selection',
      href: '/final-selection',
      alwaysEnabled: false
    },
    {
      image: <i className='ri-bar-chart-2-line'></i>,
      menuItem: 'Insurance',
      href: '/insurance',
      alwaysEnabled: true
    }
  ])

  const pathname = usePathname()

  return (
    <HorizontalMenuContext.Provider value={providerValue}>
      <FloatingTree>
        <div className='flex items-center justify-center gap-x-[20px] min-w-[1300px] w-full '>
          {menuData.map((items, index) => {
            const isDisabled = !items.alwaysEnabled && !hasTenderId
            const isActive = pathname === items.href

            return (
              <Link
                key={index}
                href={isDisabled ? '#' : items.href}
                onClick={e => {
                  if (isDisabled) {
                    e.preventDefault()
                  }
                }}
                className={`flex items-center ${isActive ? 'bg-[#35C0ED] text-white' : ''} ${
                  isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
                } justify-center py-2 rounded-lg min-w-[140px]`}
                style={{
                  color: isDisabled ? '#9e9e9e' : 'inherit',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  pointerEvents: isDisabled ? 'none' : 'auto'
                }}
              >
                <section className='flex gap-x-[8px] px-3'>
                  <div className='size-[22px]' style={{ color: isDisabled ? '#9e9e9e' : 'inherit' }}>
                    {items.image}
                  </div>
                  <div className='text-[15px]' style={{ color: isDisabled ? '#9e9e9e' : 'inherit' }}>
                    {items.menuItem}
                  </div>
                </section>
              </Link>
            )
          })}
        </div>
      </FloatingTree>
    </HorizontalMenuContext.Provider>
  )
}

export default forwardRef(Menu)
