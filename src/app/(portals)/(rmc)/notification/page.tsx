'use client'
import React from 'react'

import NotificationTable from '@/views/Notification/NotificationTable'
import { useNotifications } from '@/hooks/useNotifications'

const Page = () => {
  const userId = 29
  const { notifications } = useNotifications(userId)

  return (
    <div className='min-h-screen  py-8'>
      <NotificationTable notifications={notifications} />
    </div>
  )
}

export default Page
