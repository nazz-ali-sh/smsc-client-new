import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

interface CustomTooltipProps {
  children: React.ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  align?: 'left' | 'center' | 'right'
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  text,
  position = 'top',
  className = '',
  align = 'center'
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const getTooltipPosition = () => {
    const basePosition = {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '8px'
    }

    switch (position) {
      case 'top':
        if (align === 'left') {
          return {
            bottom: '100%',
            left: '0%',
            transform: 'translateX(0%)',
            marginBottom: '8px'
          }
        } else if (align === 'right') {
          return {
            bottom: '100%',
            right: '0%',
            left: 'auto',
            transform: 'translateX(0%)',
            marginBottom: '8px'
          }
        }

        return basePosition
      case 'bottom':
        if (align === 'left') {
          return {
            top: '100%',
            left: '0%',
            transform: 'translateX(0%)',
            marginTop: '8px'
          }
        } else if (align === 'right') {
          return {
            top: '100%',
            right: '0%',
            left: 'auto',
            transform: 'translateX(0%)',
            marginTop: '8px'
          }
        }

        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px'
        }
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px'
        }
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px'
        }
      default:
        return basePosition
    }
  }

  const getArrowPosition = () => {
    const baseArrow = {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderTop: '4px solid #0B2952',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent'
    }

    switch (position) {
      case 'top':
        if (align === 'left') {
          return {
            top: '100%',
            left: '20px',
            transform: 'translateX(0%)',
            borderTop: '4px solid #0B2952',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent'
          }
        } else if (align === 'right') {
          return {
            top: '100%',
            right: '20px',
            left: 'auto',
            transform: 'translateX(0%)',
            borderTop: '4px solid #0B2952',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent'
          }
        }

        return baseArrow
      case 'bottom':
        if (align === 'left') {
          return {
            bottom: '100%',
            left: '20px',
            transform: 'translateX(0%)',
            borderBottom: '4px solid #0B2952',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent'
          }
        } else if (align === 'right') {
          return {
            bottom: '100%',
            right: '20px',
            left: 'auto',
            transform: 'translateX(0%)',
            borderBottom: '4px solid #0B2952',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent'
          }
        }

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
        return baseArrow
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={className}
    >
      {children}

      {isVisible && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: '#0B2952',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 400,
            width: 'auto',
            minWidth: 'max-content',
            maxWidth: '300px',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            ...getTooltipPosition()
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '16px',
              whiteSpace: 'normal',
              wordBreak: 'break-word'
            }}
          >
            {text}
          </Typography>

          {/* Arrow */}
          <Box
            sx={{
              position: 'absolute',
              width: 0,
              height: 0,
              ...getArrowPosition()
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default CustomTooltip
