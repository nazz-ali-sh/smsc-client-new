'use client'

import type { ReactNode } from 'react'

import ProfileViewSideBar from '../Profile/ProfileViewSideBar'

interface AccountLayoutProps {
  children: ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <div className='flex items-stretch gap-8 min-h-screen bg-[#F8FAFC]'>
      <div className='w-[374px]'>
        <ProfileViewSideBar />
      </div>

      <div className='flex-1 min-h-full'>{children}</div>
    </div>
  )
}

export default AccountLayout
