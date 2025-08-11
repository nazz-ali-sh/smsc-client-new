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
    <Card
      sx={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }}
      className=' flex flex-col border-r border-gray-200 h-full w-[395px] '
    >
      <Box className='p-3 border-b border-gray-200 px-7'>
        <Box className='flex items-center gap-3 mb-3'>
          <Avatar src='/images/avatars/1.png' className='w-10 h-10' />
          <Box className='flex-1 pt-3 '>
            <TextField
              fullWidth
              placeholder='Search..'
              size='small'
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '100px',
                  fontSize: '12px',
                  py: '1px',
                  '& fieldset': {
                    borderRadius: '100px'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6AC2ED !important'
                  }
                }
              }}
              InputProps={{
                startAdornment: <i className='ri-search-line text-gray-400 mr-2' />
              }}
              className='bg-white'
            />
          </Box>
        </Box>
      </Box>

      <Box className='flex-1 flex flex-col px-4'>
        <Box className='p-3 flex-1 '>
          <Typography
            variant='h6'
            className='mb-2 '
            sx={{ color: 'customColors.darkBlue', fontWeight: 500, fontSize: '22px', paddingTop: '10px' }}
          >
            Chat
          </Typography>
          <Box className='space-y-4 pt-2'>
            {chatContacts.map(contact => (
              <Box
                key={contact.id}
                className={`flex items-center gap-3 p-2 cursor-pointer transition-colors ${
                  contact.id === activeChat ? 'bg-[#35C0ED] rounded-md border border-[#35C0ED] text-white' : ''
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
                  <Box className='flex items-center justify-between'>
                    <Typography
                      variant='subtitle2'
                      className={`${contact.id === activeChat ? 'text-white font-semibold' : 'text-black font-normal'}  text-[12px]`}
                    >
                      {contact.name}
                    </Typography>
                    <Typography
                      variant='caption'
                      className={`${contact.id === activeChat ? 'text-white' : 'text-black'} text-[11px]`}
                    >
                      {contact.lastActivity}
                    </Typography>
                  </Box>
                  {contact.lastMessage && (
                    <Typography
                      variant='caption'
                      className={`${contact.id === activeChat ? 'text-white' : 'text-black'} truncate block pt-2 text-[11px]`}
                    >
                      {contact.lastMessage}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className='p-3 flex-1'>
          <Typography
            variant='h6'
            sx={{ color: 'customColors.darkBlue', fontWeight: 500, fontSize: '22px', paddingTop: '10px' }}
          >
            Connect
          </Typography>
          <Box className='space-y-4 pt-4'>
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
                  <Typography variant='subtitle2' className='font-normal text-black truncate  text-[12px]'>
                    {contact.name}
                  </Typography>
                  <Typography variant='caption' className='text-[#606060] font-normal text-[10px]'>
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
