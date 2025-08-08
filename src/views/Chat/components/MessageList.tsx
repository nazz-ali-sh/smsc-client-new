'use client'

import { Box, Typography, Avatar } from '@mui/material'

interface ChatMessage {
  id: string
  sender: 'user' | 'other'
  message: string
  timestamp: string
  avatar: string
  name: string
}

interface MessageListProps {
  messages: ChatMessage[]
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <Box className='flex-1 p-3 space-y-3 bg-gray-50'>
      {messages.map(msg => (
        <Box key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Box className={`flex items-end gap-2 max-w-xs ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <Avatar src={msg.avatar.startsWith('/') ? msg.avatar : undefined} className='w-8 h-8'>
              {!msg.avatar.startsWith('/') && msg.avatar}
            </Avatar>
            <Box className='flex flex-col'>
              <Box
                className={`px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-[#35C0ED] text-white' : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <Typography variant='body2'>{msg.message}</Typography>
              </Box>
              <Box className='flex items-center gap-1 mt-1 justify-end'>
                <Box className='w-4 h-4 text-green-500'>
                  <svg fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Box>
                <Typography variant='caption' className='text-gray-500'>
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default MessageList
