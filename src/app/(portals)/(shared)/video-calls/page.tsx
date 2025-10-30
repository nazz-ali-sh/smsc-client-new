'use client'

import InviteCallsView from '@/views/inviteVideoCalls/InviteCallsView'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'

const PmaVideoCalls = () => {
  return (
    <div className='flex items-center justify-center'>
      <h1 className='text-4xl font-bold text-gray-800'>PMA Video Calls Coming Soon</h1>
    </div>
  )
}

const RmcVideoCalls = () => {
  return <InviteCallsView />
}

const VideoCallsContent = withPortalCheck(PmaVideoCalls, RmcVideoCalls)

export default function Page() {
  return <VideoCallsContent />
}
