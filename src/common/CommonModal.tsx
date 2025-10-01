import type { ReactNode } from 'react'
import React from 'react'

import type { DialogProps, SxProps, Theme } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material'

export interface CommonModalProps {
  isOpen: boolean
  handleClose: () => void
  header?: string
  children: ReactNode
  maxWidth?: DialogProps['maxWidth']
  fullWidth?: boolean
  headerSx?: SxProps<Theme>
  isBorder?: boolean
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  handleClose,
  header,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  headerSx,
  isBorder = false
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          padding: '16px'
        }
      }}
    >
      {header && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            ...(isBorder && {
              borderBottom: '2px solid #0000001C'
            })
          }}
        >
          <Typography variant='h6' sx={headerSx}>
            {header}
          </Typography>
          <IconButton onClick={handleClose}>
            <i className='ri-close-line'></i>
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default CommonModal
