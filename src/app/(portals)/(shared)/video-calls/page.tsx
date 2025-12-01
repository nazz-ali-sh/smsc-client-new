'use client'

import InviteCallsView from '@/views/inviteVideoCalls/InviteCallsView'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'
import PmaInviteCallsView from '@/views/inviteVideoCalls/pmainviteCallsView'

const PmaVideoCalls = () => {
  return <PmaInviteCallsView />
}

const RmcVideoCalls = () => {
  return <InviteCallsView />
}

const VideoCallsContent = withPortalCheck(PmaVideoCalls, RmcVideoCalls)

export default function Page() {
  return <VideoCallsContent />
}
