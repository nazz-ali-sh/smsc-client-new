import React from 'react'

import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/system'

interface CustomButtonProps extends ButtonProps {
  sx?: SxProps<Theme>
  children: React.ReactNode
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, sx, ...props }) => {
  return (
    <Button
      variant='contained'
      sx={{
        fontSize: '10px',
        fontWeight: 700,
        backgroundColor: 'customColors.ligthBlue',
        '&:hover': {
          backgroundColor: 'customColors.ligthBlue'
        },

        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
