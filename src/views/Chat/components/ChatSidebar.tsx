'use client'

import { Box, Card, Typography, Avatar, TextField } from '@mui/material'

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

interface ChatSidebarProps {
  chatContacts: ChatContact[]
  connectContacts: ChatContact[]
  activeChat: string
  onChatSelect: (chatId: string) => void
}

const ChatSidebar = ({ chatContacts, connectContacts, activeChat, onChatSelect }: ChatSidebarProps) => {
  return (
    <Card className='w-80 flex flex-col border-r border-gray-200 bg-white h-full'>
      <Box className='p-3 border-b border-gray-200'>
        <Box className='flex items-center gap-3 mb-3'>
          <Avatar src='/images/avatars/1.png' className='w-10 h-10' />
          <Box className='flex-1'>
            <TextField
              fullWidth
              placeholder='Search..'
              size='small'
              InputProps={{
                startAdornment: <i className='ri-search-line text-gray-400 mr-2' />
              }}
              className='bg-white'
            />
          </Box>
        </Box>
      </Box>

      <Box className='flex-1 flex flex-col'>
        <Box className='p-3 flex-1'>
          <Typography variant='h6' className='font-semibold mb-2 text-[#35C0ED]'>
            Chat
          </Typography>
          <Box className='space-y-1'>
            {chatContacts.map(contact => (
              <Box
                key={contact.id}
                className={`flex items-center gap-3 p-2 cursor-pointer transition-colors ${
                  contact.id === activeChat ? 'bg-[#35C0ED] bg-opacity-10 border border-[#35C0ED]' : 'hover:bg-gray-50'
                }`}
                onClick={() => onChatSelect(contact.id)}
              >
                <Box className='relative'>
                  <Avatar src={contact.avatar.startsWith('/') ? contact.avatar : undefined} className='w-10 h-10'>
                    {!contact.avatar.startsWith('/') && contact.avatar}
                  </Avatar>
                  {contact.isOnline && (
                    <Box className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
                  )}
                </Box>
                <Box className='flex-1 min-w-0'>
                  <Typography variant='subtitle2' className='font-medium text-gray-900 truncate'>
                    {contact.name}
                  </Typography>
                  <Typography variant='caption' className='text-gray-500'>
                    {contact.lastActivity}
                  </Typography>
                  {contact.lastMessage && (
                    <Typography variant='caption' className='text-gray-600 truncate block'>
                      {contact.lastMessage}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className='p-3 flex-1'>
          <Typography variant='h6' className='font-semibold mb-2 text-[#35C0ED]'>
            Connect
          </Typography>
          <Box className='space-y-1'>
            {connectContacts.map(contact => (
              <Box
                key={contact.id}
                className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 transition-colors'
              >
                <Box className='relative'>
                  <Avatar src={contact.avatar.startsWith('/') ? contact.avatar : undefined} className='w-10 h-10'>
                    {!contact.avatar.startsWith('/') && contact.avatar}
                  </Avatar>
                  {contact.isOnline && (
                    <Box className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
                  )}
                </Box>
                <Box className='flex-1 min-w-0'>
                  <Typography variant='subtitle2' className='font-medium text-gray-900 truncate'>
                    {contact.name}
                  </Typography>
                  <Typography variant='caption' className='text-gray-500'>
                    {contact.role}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default ChatSidebar
