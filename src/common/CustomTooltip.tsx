import React, { useState, useRef, useLayoutEffect } from 'react'

import { createPortal } from 'react-dom'
import { Box, Typography } from '@mui/material'

interface CustomTooltipProps {
  children: React.ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  align?: 'left' | 'center' | 'right'
  cursor?: 'default' | 'pointer' | 'not-allowed'
  width?: string | number
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  text,
  position = 'top',
  className = '',
  align = 'center',
  cursor = 'pointer',
  width
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (isVisible && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()

      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      })
    }
  }, [isVisible])

  const getTooltipPosition = () => {
    switch (position) {
      case 'top':
        if (align === 'left') return { bottom: '100%', left: 0, marginBottom: '8px' }
        if (align === 'right') return { bottom: '100%', right: 0, marginBottom: '8px' }

        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' }
      case 'bottom':
        if (align === 'left') return { top: '100%', left: 0, marginTop: '8px' }
        if (align === 'right') return { top: '100%', right: 0, marginTop: '8px' }

        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-0%)', marginRight: '8px' }
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' }
      default:
        return {}
    }
  }

  const getArrowPosition = () => {
    switch (position) {
      case 'top':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderTop: '4px solid #0B2952',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent'
        }
      case 'bottom':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderBottom: '4px solid #0B2952',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent'
        }
      case 'left':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderLeft: '4px solid #0B2952',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent'
        }
      case 'right':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderRight: '4px solid #0B2952',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent'
        }
      default:
        return {}
    }
  }

  return (
    <>
      <Box
        ref={wrapperRef}
        sx={{ position: 'relative', display: 'inline-block', cursor }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={className}
      >
        {children}
      </Box>

      {isVisible &&
        createPortal(
          <Box
            sx={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                backgroundColor: '#0B2952',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 400,
                width: width || 'auto',
                minWidth: width ? '0' : 'max-content',
                maxWidth: width || '300px',
                whiteSpace: 'normal',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                ...getTooltipPosition()
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  lineHeight: '16px',
                  wordBreak: 'break-word'
                }}
              >
                {text}
              </Typography>
              <Box sx={{ position: 'absolute', width: 0, height: 0, ...getArrowPosition() }} />
            </Box>
          </Box>,
          document.body
        )}
    </>
  )
}

export default CustomTooltip
