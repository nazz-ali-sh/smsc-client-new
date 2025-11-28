'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Box, Typography, IconButton, Fade } from '@mui/material'

interface RmcTooltipProps {
  isOpen: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
  title: string
  content: string
  children?: React.ReactNode
  placement?: 'right' | 'left' | 'top' | 'bottom'
}

const RmcTooltip: React.FC<RmcTooltipProps> = ({ isOpen, onClose, anchorEl, title, content, children, placement }) => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, arrowLeft: 0 })

  useEffect(() => {
    if (isOpen && anchorEl) {
      const rect = anchorEl.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

      let tooltipTop = 0
      let tooltipLeft = 0
      let arrowLeft = 0

      switch (placement) {
        case 'bottom':
          tooltipTop = rect.bottom + 8 
          tooltipLeft = rect.left + rect.width / 2 - 150 
          arrowLeft = 150 - 6
          break
        case 'top':
          tooltipTop = rect.top - 120
          tooltipLeft = rect.left + rect.width / 2
          arrowLeft = rect.width / 2 - 6
          break
        case 'left':
          tooltipTop = rect.top + rect.height / 2 - 60
          tooltipLeft = rect.left - 300 - 8
          arrowLeft = 300 - 12
          break
        case 'right':
        default: // default position
          tooltipTop = rect.top + rect.height / 2 - 60
          tooltipLeft = rect.right + 8
          arrowLeft = -6
          break
      }

      setPosition({ top: tooltipTop + scrollTop, left: tooltipLeft + scrollLeft, arrowLeft })
    }
  }, [isOpen, anchorEl, placement])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Fade in={isOpen} timeout={200}>
      <Box
        ref={tooltipRef}
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex: 9999,
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          minWidth: '300px',
          maxWidth: '400px',
          minHeight: '120px',
          maxHeight: '200px',
          padding: '16px',
          animation: 'tooltipSlideIn 0.2s ease-out'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: `${position.arrowLeft - 6}px`,
            top: '60px',
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '6px solid white',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: '1px',
              top: '-7px',
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderRight: '7px solid #E5E7EB'
            }
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#1F2937'
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size='small'
            sx={{
              padding: '4px',
              '&:hover': {
                backgroundColor: '#F3F4F6'
              }
            }}
          >
            <i className='ri-close-line' style={{ fontSize: '16px', color: '#6B7280' }}></i>
          </IconButton>
        </Box>

        <Typography
          variant='body2'
          sx={{
            fontSize: '13px',
            color: '#6B7280',
            lineHeight: 1.5,
            marginBottom: children ? '12px' : '0'
          }}
        >
          {content}
        </Typography>

        {children}
      </Box>
    </Fade>
  )
}

export default RmcTooltip
