import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  Divider,
  Button
} from '@mui/material'

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  type: string
  inviteData: any[]
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, inviteData, type }) => {
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
            {type === 'videoCall' || type === 'siteVisit'
              ? 'Your Request Has been Sent!'
              : 'Thank You For Using Our Service!'}
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

        <Box>
          {type === 'videoCall' || type === 'siteVisit' ? (
            <Box>
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
                    {inviteData?.[0]?.pma_name || inviteData?.[1]?.pma_name || 'N/A'}
                  </Box>
                  <Box
                    sx={{
                      borderTop: 'none',
                      padding: '12px'
                    }}
                  >
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                      Slot Timing: {inviteData?.[0]?.slot_name || inviteData?.[2]?.slot_name || 'N/A'}
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
                  You will receive confirmation in your registered email. If you do not see it, please check your spam
                  folder.
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'customColors.textGray', lineHeight: 1.4, fontSize: '0.875rem', paddingY: '20px' }}
                >
                  Once the managing agents confirm their preferred time, a video call link will be provided within your
                  portal. Remember to add the calls to your calendar and share the link with any other members of your
                  block who should join the call.
                </Typography>
              </Box>
            </Box>
          ) : type === 'appointAgent' ? (
            <Box>
              <Typography variant='body2' sx={{ fontSize: '0.875rem', marginBottom: '10px' }}>
                Home Block Management Have Been Notified & Will Be In Touch With You Very Shortly.
              </Typography>

              <Typography variant='body2' sx={{ fontSize: '0.875rem', marginBottom: '10px' }}>
                We hope you found our service valuable and would appreciate any feedback to help us continue improving
                for future leaseholders.
              </Typography>

              <Typography variant='body2' sx={{ fontSize: '0.875rem', marginBottom: '10px' }}>
                If you have any suggestions or comments, please email us at admin@savemyservicecharge.co.uk.
                Alternatively, feel free to leave us a review on Google or Facebook.
              </Typography>

              <Box display='flex' justifyContent='flex-end' gap={2} marginTop='20px'>
                <Button
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                  variant='contained'
                >
                  <i className='ri-facebook-fill bg-white'></i>
                  Leave Feedback On Google
                </Button>

                <Button
                  sx={{
                    backgroundColor: 'customColors.ligthBlue',
                    '&:hover': { backgroundColor: 'customColors.ligthBlue' }
                  }}
                  variant='contained'
                >
                  <i className='ri-google-fill bg-white'></i>
                  Leave Feedback On Facebook
                </Button>
              </Box>
            </Box>
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
