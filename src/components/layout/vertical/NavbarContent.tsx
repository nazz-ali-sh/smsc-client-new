'use client'

import classnames from 'classnames'

import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import HorizontalNav from '@/@menu/horizontal-menu'

const NavbarContent = () => {
  return (
    <>
      <div
        className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
      >
        <div className='flex items-center gap-4'>
          <NavToggle />
          <ModeDropdown />
        </div>
        <HorizontalNav />
        <div className='flex items-center'>
          <UserDropdown />
        </div>
      </div>
      <h1>Hello!</h1>
    </>
  )
}

export default NavbarContent
