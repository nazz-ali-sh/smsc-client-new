'use client'

import { useState } from 'react'

import { Box } from '@mui/material'

import { ChatSidebar, ChatHeader, MessageInput, MessageList } from './components'

interface ChatMessage {
  id: string
  sender: 'user' | 'other'
  message: string
  timestamp: string
  avatar: string
  name: string
}

interface ChatContact {
  id: string
  name: string
  role: string
  avatar: string
  isOnline: boolean
  lastMessage?: string
  lastActivity?: string
  isActive?: boolean
}

const Chat = () => {
  const [activeChat, setActiveChat] = useState('1')
  const [message, setMessage] = useState('')

  const chatContacts: ChatContact[] = [
    {
      id: '1',
      name: 'PMA Company name',
      role: 'Business Analyst',
      avatar: '/images/avatars/1.png',
      isOnline: true,
      lastMessage: 'Lorem ipsum dolor sit amet.',
      lastActivity: '5 Minutes',
      isActive: true
    },
    {
      id: '2',
      name: 'PMA Company name',
      role: 'UI/UX Designer',
      avatar: 'GS',
      isOnline: true,
      lastMessage: 'Lorem ipsum dolor sit amet.',
      lastActivity: '5 Minutes'
    },
    {
      id: '3',
      name: 'PMA Company name',
      role: 'Developer',
      avatar: '/images/avatars/1.png',
      isOnline: true,
      lastMessage: 'Lorem ipsum dolor sit amet.',
      lastActivity: '5 Minutes'
    }
  ]

  const connectContacts: ChatContact[] = [
    {
      id: '4',
      name: 'PMA Company name',
      role: 'UI/UX Designer',
      avatar: 'GS',
      isOnline: true
    },
    {
      id: '5',
      name: 'PMA Company name',
      role: 'UI/UX Designer',
      avatar: '/images/avatars/1.png',
      isOnline: true
    },
    {
      id: '6',
      name: 'PMA Company name',
      role: 'UI/UX Designer',
      avatar: 'GS',
      isOnline: true
    }
  ]

  const messages: ChatMessage[] = [
    {
      id: '1',
      sender: 'other',
      message: 'Lorem ipsum dolor sit amet consectetur.',
      timestamp: '10:56 pm',
      avatar: '/images/avatars/1.png',
      name: 'PMA Company name'
    },
    {
      id: '2',
      sender: 'user',
      message: 'Lorem ipsum dolor sit amet consectetur.',
      timestamp: '10:56 pm',
      avatar: 'GS',
      name: 'You'
    },
    {
      id: '3',
      sender: 'other',
      message: 'Lorem ipsum dolor sit amet consectetur.',
      timestamp: '10:56 pm',
      avatar: '/images/avatars/1.png',
      name: 'PMA Company name'
    },
    {
      id: '4',
      sender: 'user',
      message: 'Lorem ipsum dolor sit amet consectetur amet.',
      timestamp: '10:56 pm',
      avatar: 'GS',
      name: 'You'
    },
    {
      id: '5',
      sender: 'user',
      message: 'Lorem ipsum dolor sit amet consectetur. vitae etiam convallis sit diam.',
      timestamp: '10:56 pm',
      avatar: 'GS',
      name: 'You'
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId)
    console.log('Selected chat:', chatId)
  }

  const activeContact = chatContacts.find(contact => contact.id === activeChat) || chatContacts[0]

  return (
    <Box className='flex h-[calc(100vh-80px)] bg-white'>
      <ChatSidebar
        chatContacts={chatContacts}
        connectContacts={connectContacts}
        activeChat={activeChat}
        onChatSelect={handleChatSelect}
      />
      <Box className='flex-1 flex flex-col border-l border-gray-200'>
        <ChatHeader
          contactName={activeContact.name}
          contactRole={activeContact.role}
          contactAvatar={activeContact.avatar}
          isOnline={activeContact.isOnline}
        />
        <MessageList messages={messages} />
        <MessageInput message={message} onMessageChange={setMessage} onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  )
}

export default Chat
