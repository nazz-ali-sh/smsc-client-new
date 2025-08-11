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
    <Box className='flex-1 s p-3 space-y-3 bg-white'>
      {messages.map(msg => (
        <Box key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Box className={`flex items-start gap-2 max-w-md ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <Avatar src={msg.avatar.startsWith('/') ? msg.avatar : undefined} className='w-8 h-8'>
              {!msg.avatar.startsWith('/') && msg.avatar}
            </Avatar>
            <Box className='flex flex-col'>
              <Box
                className={`px-4 py-2 text-white  ${
                  msg.sender === 'user'
                    ? 'bg-[#35C0ED]  rounded-tl-lg rounded-bl-lg rounded-br-lg'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-tr-lg rounded-br-lg rounded-bl-lg'
                }`}
              >
                <Typography variant='body2'>{msg.message}</Typography>
              </Box>

              <Box
                className={`flex items-center gap-1 mt-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Box className=' text-green-500 mt-1'>
                  <i className='ri-check-double-line size-4'></i>
                </Box>
                <Typography variant='caption' className='text-gray-500 text-[10px] font-normal'>
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
