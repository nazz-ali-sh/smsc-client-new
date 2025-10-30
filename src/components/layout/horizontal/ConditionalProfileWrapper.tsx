'use client'

import { getUserType } from '@/utils/tokenSync'
import { isRmcPortalAndUser } from '@/utils/portalHelper'
import ProfileCompletionNotificationWrapper from './ProfileCompletionNotificationWrapper'

const ConditionalProfileWrapper = () => {
  const userType = getUserType()
  const shouldShow = isRmcPortalAndUser(userType)

  if (!shouldShow) {
    return null
  }

  return <ProfileCompletionNotificationWrapper />
}

export default ConditionalProfileWrapper
