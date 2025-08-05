'use client'

// React Imports
import { forwardRef, useState } from 'react'
import type { ForwardRefRenderFunction, ReactNode, HTMLAttributes } from 'react'

// Third-party Imports
import classnames from 'classnames'
import styled from '@emotion/styled'
import type { CSSObject } from '@emotion/styled'

// Style Imports
import { menuClasses } from '../../utils/menuClasses'
import StyledMenuLabel from '../../styles/StyledMenuLabel'

// Styled Component
const StyledSubMenu = styled.li<{ rootStyles?: CSSObject }>`
  ${({ rootStyles }) => rootStyles};
`

export type SubMenuProps = HTMLAttributes<HTMLLIElement> & {
  label?: ReactNode
  rootStyles?: CSSObject
  disabled?: boolean
}

const SubMenu: ForwardRefRenderFunction<HTMLLIElement, SubMenuProps> = (props, ref) => {
  // Props
  const { className, rootStyles, ...rest } = props

  // State
  const [menuData] = useState([
    {
      image: <i className='ri-home-smile-line'></i>,
      menuItem: 'Dashboards'
    },
    {
      image: '',
      menuItem: 'Tender information'
    },
    {
      image: '',
      menuItem: 'Tender Results'
    },
    {
      image: '',
      menuItem: 'Shortlisted Agents'
    },
    {
      image: '',
      menuItem: 'Video Calls'
    },
    {
      image: '',
      menuItem: 'Site Visits'
    },
    {
      image: '',
      menuItem: 'Final Selection'
    },
    {
      image: '',
      menuItem: 'Insurance'
    }
  ])

  return (
    <StyledSubMenu
      ref={ref}
      className={classnames(menuClasses.subMenuRoot, className)}
      rootStyles={rootStyles}
      {...rest}
    >
      <div className='flex items-center gap-2'>
        {menuData.map((item, index) => (
          <section key={index} className='flex items-center gap-1'>
            {item.image && <div>{item.image}</div>}
            <StyledMenuLabel>{item.menuItem}</StyledMenuLabel>
          </section>
        ))}
      </div>
    </StyledSubMenu>
  )
}

export default forwardRef<HTMLLIElement, SubMenuProps>(SubMenu)
