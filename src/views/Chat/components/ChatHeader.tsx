'use client'

import { Box, Card, Typography, Avatar, IconButton } from '@mui/material'

interface ChatHeaderProps {
  contactName: string
  contactRole: string
  contactAvatar: string
  isOnline: boolean
}

const ChatHeader = ({ contactName, contactRole, contactAvatar, isOnline }: ChatHeaderProps) => {
  return (
    <Card
      sx={{
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
      className='p-4 py-[20.5px] border-b border-gray-200 bg-white shadow-sm'
    >
      <Box className='flex items-center justify-between'>
        <Box className='flex items-center gap-3'>
          <Box className='relative'>
            <Avatar src={contactAvatar} className='w-10 h-10' />
            {isOnline && (
              <Box className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
            )}
          </Box>
          <Box>
            <Typography variant='h6' className='font-semibold text-gray-900'>
              {contactName}
            </Typography>
            <Typography variant='caption' className='text-gray-500'>
              {contactRole}
            </Typography>
          </Box>
        </Box>
        <Box className='flex items-center gap-2'>
          <IconButton size='small' className='text-gray-600 hover:bg-gray-100'>
            <i className='ri-phone-line' />
          </IconButton>
          <IconButton size='small' className='text-gray-600 hover:bg-gray-100'>
            <i className='ri-vidicon-line' />
          </IconButton>
          <IconButton size='small' className='text-gray-600 hover:bg-gray-100'>
            <i className='ri-search-line' />
          </IconButton>
          <IconButton size='small' className='text-gray-600 hover:bg-gray-100'>
            <i className='ri-more-2-line' />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default ChatHeader
