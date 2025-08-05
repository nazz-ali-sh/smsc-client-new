import React from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, useTheme, Divider } from '@mui/material'

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose }) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '400px',
          paddingX: '24px',
          width: '700px'
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
        <Typography variant='body2' sx={{ mb: 3, color: '#333', lineHeight: 1.5 }}>
          Your video call request has been successfully submitted to the following managing agents. Below is the list of
          managing agents you have shortlisted.
        </Typography>

        <Box sx={{ mb: 3, marginTop: '24px' }}>
          <Box sx={{ mb: 2 }}>
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
            >
              Ouma Property Management
            </Box>
            <Box
              sx={{
                borderTop: 'none',
                padding: '12px'
              }}
            >
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                Tuesday, 8th October:
              </Typography>
              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                Midday (12:00 pm- 14:30 pm)
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                Afternoon (14:30 pm- 17:00 pm)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
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
            >
              Ouma Property Management
            </Box>
            <Box
              sx={{
                borderTop: 'none',
                padding: '12px'
              }}
            >
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                Tuesday, 8th October:
              </Typography>
              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                Midday (12:00 pm- 14:30 pm)
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                Afternoon (14:30 pm- 17:00 pm)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
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
            >
              Ouma Property Management
            </Box>
            <Box
              sx={{
                borderTop: 'none',
                padding: '12px'
              }}
            >
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                Tuesday, 8th October:
              </Typography>
              <Typography variant='body2' sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                Midday (12:00 pm- 14:30 pm)
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                Afternoon (14:30 pm- 17:00 pm)
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ paddingY: '12px' }}>
          <Divider />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            variant='body2'
            sx={{ mb: 1.5, color: 'customColors.textGray', lineHeight: 1.4, fontSize: '0.875rem' }}
          >
            You will receive confirmation in your registered email. If you do not see it, please check your spam folder.
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: 'customColors.textGray', lineHeight: 1.4, fontSize: '0.875rem', paddingY: '20px' }}
          >
            Once the managing agents confirm their preferred time, a video call link will be provided within your
            portal. Remember to add the calls to your calendar and share the link with any other members of your block
            who should join the call.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
