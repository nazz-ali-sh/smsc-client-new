'use client'

import React from 'react'

import { Box, Typography } from '@mui/material'

interface CustomLoaderProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ message, size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6'
      case 'large':
        return 'w-10 h-10'
      default:
        return 'w-8 h-8'
    }
  }

  const getBorderClasses = () => {
    switch (size) {
      case 'small':
        return 'border-2'
      case 'large':
        return 'border-4'
      default:
        return 'border-3'
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: message ? 4 : 0
      }}
    >
      <div className='flex'>
        <div className='relative'>
          <div
            className={`${getSizeClasses()} rounded-full absolute ${getBorderClasses()} border-solid border-gray-200`}
          ></div>
          <div
            className={`${getSizeClasses()} rounded-full animate-spin absolute ${getBorderClasses()} border-solid border-[#35C0ED] border-t-transparent`}
          ></div>
        </div>
      </div>

      {message && (
        <Typography
          variant='body1'
          sx={{
            color: '#696969',
            fontSize: '14px',
            fontWeight: 500,
            marginTop: 10
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default CustomLoader
