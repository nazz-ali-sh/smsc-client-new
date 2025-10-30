'use client'

import MyAccountView from '@/views/MyAccount/MyAccountView'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'

const PmaAccount = () => {
  return (
    <div className='flex items-center justify-center'>
      <h1 className='text-4xl font-bold text-gray-800'>PMA Account Coming Soon</h1>
    </div>
  )
}

const RmcAccount = () => {
  return <MyAccountView />
}

const AccountContent = withPortalCheck(PmaAccount, RmcAccount)

export default function Page() {
  return <AccountContent />
}
