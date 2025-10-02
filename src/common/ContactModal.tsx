import React from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, useTheme, Divider } from '@mui/material'

interface ToolTipModalProps {
  open: boolean
  onClose: () => void
}

const ContactModal: React.FC<ToolTipModalProps> = ({ open, onClose }) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '300px',
          paddingX: '24px',
          width: '1200px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '16px' }}>
          <Typography
            variant='h4'
            sx={{
              color: theme.colorSchemes.light.palette.customColors.darkBlue,
              fontSize: '1.7rem'
            }}
          >
            Your Request Has been Sent!
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'customColors.textGray' }}>
            <i className='ri-close-line' />
          </IconButton>
        </Box>
        <Box sx={{ paddingY: '12px' }}>
          <Divider />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 6 }}>
              Your request for an agent to contact you has been successfully submitted to the following agent:{' '}
            </Typography>
            <Box
              sx={{
                backgroundColor: theme.colorSchemes.light.palette.customColors.darkGray,
                color: 'white',
                paddingX: '10px',
                fontWeight: '600',
                borderRadius: '5px',
                paddingY: '6px',
                fontSize: '0.875rem'
              }}
            ></Box>

            <>
              <Box
                sx={{
                  borderTop: 'none',
                  paddingTop: '12px'
                }}
              >
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                  The agent will be in touch in due course.
                </Typography>
              </Box>
            </>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ContactModal
