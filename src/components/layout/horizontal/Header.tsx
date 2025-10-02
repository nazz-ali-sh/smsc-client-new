'use client'

import Navigation from './Navigation'
import NavbarContent from './NavbarContent'
import Navbar from '@layouts/components/horizontal/Navbar'
import LayoutHeader from '@layouts/components/horizontal/Header'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'

const Header = ({ dictionary }: any) => {
  const { isBreakpointReached } = useHorizontalNav()

  console.log(dictionary, 'dictionary')

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

export default Header
