import React from 'react'

import type { ButtonProps } from '@mui/material'
import { Button, CircularProgress } from '@mui/material'
import type { SxProps, Theme } from '@mui/system'

interface CustomButtonProps extends ButtonProps {
  sx?: SxProps<Theme>
  children: React.ReactNode
  variant?: ButtonProps['variant']
  isLoading?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  sx,
  variant = 'contained',
  isLoading = false,
  ...props
}) => {
  const { startIcon, endIcon, ...buttonProps } = props

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
      backgroundColor: '#A9E1F7',
      color: '#fff !important',
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
      backgroundColor: '#A9E1F7',
      color: '#fff !important',
      borderColor: '#A9E1F7',
      opacity: 1
    }
  }

  return (
    <Button
      variant={variant}
      disableElevation
      disabled={isLoading || props.disabled}
      startIcon={isLoading ? undefined : startIcon}
      endIcon={
        isLoading ? (
          <CircularProgress
            size={20}
            thickness={4}
            sx={{
              color: variant === 'outlined' ? 'customColors.ligthBlue' : '#fff'
            }}
          />
        ) : (
          endIcon
        )
      }
      sx={{
        ...baseStyles,
        ...(variant === 'contained' ? containedStyles : {}),
        ...(variant === 'outlined' ? outlinedStyles : {}),
        ...sx
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

export default CustomButton
