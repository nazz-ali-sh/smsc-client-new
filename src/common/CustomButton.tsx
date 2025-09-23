import React from 'react'

import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/system'

interface CustomButtonProps extends ButtonProps {
  sx?: SxProps<Theme>
  children: React.ReactNode
  variant?: ButtonProps['variant']
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, sx, variant = 'contained', ...props }) => {
  const baseStyles: SxProps<Theme> = {
    fontSize: '14px',
    fontWeight: 700
  }

  const containedStyles: SxProps<Theme> = {
    backgroundColor: 'customColors.ligthBlue',
    color: '#fff',
    '&.MuiButton-contained, &.MuiButton-contained:hover, &.MuiButton-contained:active, &.MuiButton-contained:focus': {
      backgroundColor: 'customColors.ligthBlue'
    },
    '&.Mui-disabled': {
      backgroundColor: '#26C6F929',
      color: '#fff',
      opacity: 1
    }
  }

  const outlinedStyles: SxProps<Theme> = {
    backgroundColor: '#fff',
    color: 'customColors.ligthBlue',
    border: '1px solid',
    borderColor: 'customColors.ligthBlue',
    '&.MuiButton-outlined, &.MuiButton-outlined:hover, &.MuiButton-outlined:active, &.MuiButton-outlined:focus': {
      backgroundColor: '#fff',
      color: 'customColors.ligthBlue',
      borderColor: 'customColors.ligthBlue'
    },
    '&.Mui-disabled': {
      backgroundColor: '#26C6F929',
      color: '#fff',
      borderColor: '#26C6F929',
      opacity: 1
    }
  }

  return (
    <Button
      variant={variant}
      disableElevation
      sx={{
        ...baseStyles,
        ...(variant === 'contained' ? containedStyles : {}),
        ...(variant === 'outlined' ? outlinedStyles : {}),
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
