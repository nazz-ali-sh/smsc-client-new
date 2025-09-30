// React Imports
import React from 'react'

// MUI Imports
import type { Theme } from '@mui/material/styles'

const SelectIcon = () => {
  return <i className='ri-arrow-down-s-line' />
}

const iconStyles = (theme: Theme) => ({
  userSelect: 'none',
  display: 'inline-block',
  fill: 'currentColor',
  flexShrink: 0,
  transition: theme.transitions.create('fill', {
    duration: theme.transitions.duration.shorter
  }),
  fontSize: '1.25rem',
  position: 'absolute',
  right: '1rem',
  top: 'calc(50% - 0.5em)',
  pointerEvents: 'none'
})

const select: Theme['components'] = {
  MuiSelect: {
    defaultProps: {
      IconComponent: SelectIcon
    },
    styleOverrides: {
      select: ({ theme, ownerState }) => ({
        ...(ownerState.variant === 'outlined' && {
          minBlockSize: '1.5em'
        }),
        '&[aria-expanded="true"] ~ i, &[aria-expanded="true"] ~ svg': {
          transform: 'rotate(180deg)'
        },
        '& ~ i, & ~ svg': iconStyles(theme as Theme),
        '&:not(aria-label="Without label") ~ .MuiOutlinedInput-notchedOutline > legend > span': {
          paddingInline: '5px'
        }
      })
    }
  },

  MuiNativeSelect: {
    styleOverrides: {
      select: ({ theme }) => ({
        '& + i, & + svg': iconStyles(theme as Theme)
      })
    }
  },

  // ✅ MenuItem override
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: '#35C0ED1A !important',
          color: '#35C0ED !important',
          '&:hover': {
            backgroundColor: '#35C0ED33 !important'
          }
        }
      }
    }
  },

  // ✅ This fixes the blue highlight on hover/focus
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-focusVisible': {
          backgroundColor: '#35C0ED1A !important',
          color: '#35C0ED !important'
        },
        '&:hover': {
          backgroundColor: '#35C0ED1A !important',
          color: '#35C0ED !important'
        }
      }
    }
  }
}

export default select
