'use client'

import Chat from '@/views/Chat/Chat'
import { withPortalCheck } from '@/components/hoc/withPortalCheck'

const PmaChat = () => {
  return (
    <div className='flex items-center justify-center'>
      <h1 className='text-4xl font-bold text-gray-800'>PMA Chats Coming Soon</h1>
    </div>
  )
}

const RmcChat = () => {
  return <Chat />
}

const ChatContent = withPortalCheck(PmaChat, RmcChat)

export default function ChatPage() {
  return <ChatContent />
}
