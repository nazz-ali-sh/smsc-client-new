'use client'

// React Imports
import { createContext, forwardRef, useMemo, useState } from 'react'
import type { ForwardRefRenderFunction, MenuHTMLAttributes, ReactElement } from 'react'

// Third-party Imports
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { FloatingTree } from '@floating-ui/react'

// Type Imports
import type { MenuProps as VerticalMenuProps } from '../vertical-menu/Menu'
import type {
  ChildrenType,
  MenuItemStyles,
  RenderExpandIconParams,
  RenderExpandedMenuItemIcon,
  RootStylesType
} from '../../types'

// Style Imports

// Default Config Imports
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
  // Props
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
      href: '/home'
    },
    {
      image: <i className='ri-mail-open-line'></i>,
      menuItem: 'Tender information',
      href: '/tender-information-update'
    },
    {
      image: <i className='ri-database-line'></i>,
      menuItem: 'Tender Results',
      href: '/tender-information'
    },
    {
      image: <i className='ri-pantone-line'></i>,
      menuItem: 'Shortlisted Agents',
      href: '/shortlist-agent'
    },
    {
      image: <i className='ri-file-list-2-line'></i>,
      menuItem: 'Invites',
      href: '/rmc-calendar'
    },
    {
      image: <i className='ri-pages-line'></i>,
      menuItem: 'Chats',
      href: '/chats'
    },
    {
      image: <i className='ri-bar-chart-2-line'></i>,
      menuItem: 'Final Selection',
      href: '/final-selection'
    },
    {
      image: <i className='ri-bar-chart-2-line'></i>,
      menuItem: 'Archive',
      href: '/archive'
    }
  ])

  const pathname = usePathname()

  return (
    <HorizontalMenuContext.Provider value={providerValue}>
      <FloatingTree>
        <div className='flex items-center justify-center gap-x-[20px] min-w-[1300px] w-full '>
          {menuData.map((items, index) => (
            <Link
              key={index}
              href={items.href}
              className={`flex items-center ${
                pathname === items.href ? 'bg-[#35C0ED] text-white' : ''
              } justify-center py-2 cursor-pointer rounded-lg min-w-[140px]`}
            >
              <section className='flex gap-x-[8px] px-3'>
                <div className='size-[22px]'>{items.image}</div>
                <div className='text-[15px]'>{items.menuItem}</div>
              </section>
            </Link>
          ))}
        </div>
      </FloatingTree>
    </HorizontalMenuContext.Provider>
  )
}

export default forwardRef(Menu)
