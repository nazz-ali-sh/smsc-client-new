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

  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number }>({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (isVisible && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()

      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      })
    }
  }, [isVisible])

  const getTooltipPosition = () => {
    const offset = 8
    const base = { position: 'absolute' as const }

    switch (position) {
      case 'top': {
        const top = coords.top - offset

        if (align === 'left') return { ...base, top, left: coords.left }
        if (align === 'right')
          return { ...base, top, left: coords.left + coords.width - (width ? Number(width) / 2 : 0) }

        // center align
        return { ...base, top, left: coords.left + coords.width / 2, transform: 'translate(-50%, -100%)' }
      }

      case 'bottom': {
        const top = coords.top + coords.height + offset

        if (align === 'left') return { ...base, top, left: coords.left }
        if (align === 'right')
          return { ...base, top, left: coords.left + coords.width - (width ? Number(width) / 2 : 0) }

        // center align
        return { ...base, top, left: coords.left + coords.width / 2, transform: 'translateX(-50%)' }
      }

      case 'left':
        return {
          ...base,
          top: coords.top + coords.height / 2,
          left: coords.left - offset,
          transform: 'translate(-100%, -50%)'
        }
      case 'right':
        return {
          ...base,
          top: coords.top + coords.height / 2,
          left: coords.left + coords.width + offset,
          transform: 'translateY(-50%)'
        }
      default:
        return base
    }
  }

  const getArrowPosition = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderTop: '4px solid #0B2952',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent'
        }
      case 'bottom':
        return {
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderBottom: '4px solid #0B2952',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent'
        }
      case 'left':
        return {
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderLeft: '4px solid #0B2952',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent'
        }
      case 'right':
        return {
          left: '-4px',
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
        sx={{ display: 'inline-block', cursor, position: 'relative' }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={className}
      >
        {children}
      </Box>

      {isVisible &&
        createPortal(
          <Box sx={{ zIndex: 9999, pointerEvents: 'none', ...getTooltipPosition() }}>
            <Box
              sx={{
                backgroundColor: '#0B2952',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 400,
                width: width || 'auto',
                maxWidth: width || '300px',
                whiteSpace: 'normal',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  lineHeight: '16px',
                  wordBreak: 'break-word',
                  display: 'block'
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
