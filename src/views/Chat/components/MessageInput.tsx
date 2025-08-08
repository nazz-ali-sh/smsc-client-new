'use client'

import { Box, Card, TextField, IconButton } from '@mui/material'

interface MessageInputProps {
  message: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
}

const MessageInput = ({ message, onMessageChange, onSendMessage }: MessageInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  return (
    <Card className='p-4 border-t border-gray-200 bg-white shadow-sm'>
      <Box className='flex items-center gap-3'>
        <TextField
          fullWidth
          placeholder='Type your message here'
          value={message}
          onChange={e => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
          className='bg-white'
          variant='outlined'
          size='small'
        />
        <IconButton size='small' className='text-gray-600 hover:bg-gray-100'>
          <i className='ri-attachment-2' />
        </IconButton>
        <IconButton size='small' className='text-gray-600 hover:bg-gray-100'>
          <i className='ri-mic-line' />
        </IconButton>
        <IconButton
          size='small'
          className='bg-[#35C0ED] text-white hover:bg-[#2ba8d4]'
          onClick={onSendMessage}
          disabled={!message.trim()}
        >
          <i className='ri-send-plane-fill' />
        </IconButton>
      </Box>
    </Card>
  )
}

export default MessageInput
