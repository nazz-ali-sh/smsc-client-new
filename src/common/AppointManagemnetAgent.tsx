'use client'

import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Grid,
  InputAdornment,
  useTheme,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material'

interface SiteVisitsModalProps {
  open: boolean
  onClose: () => void
}

const AppointManagemnetModal: React.FC<SiteVisitsModalProps> = ({ open, onClose }) => {
  const theme = useTheme()

  const handleSendInvites = () => {
    console.log('Sending invites to selected agents')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '600px',
          paddingX: '24px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, px: 3, pt: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start' sx={{ paddingTop: '32px' }}>
          <Box>
            <Typography
              variant='h4'
              sx={{
                color: theme.colorSchemes.light.palette.customColors.darkBlue,
                fontWeight: 'semibold',
                fontSize: '1.75rem'
              }}
            >
              Congratulations!
            </Typography>
            <Typography variant='body2' sx={{ paddingTop: '12px' }}>
              You’ve have chosen to appoint PMA1xxxx as your new managing agent. They will be thrilled to hear that
              they’ve been selected to manage your block
            </Typography>
          </Box>
          <IconButton onClick={onClose} size='small' sx={{ mt: -1 }}>
            <i className='ri-close-line' />
          </IconButton>
        </Box>
        <Box sx={{ paddingY: '12px' }}>
          <Divider
            sx={{
              height: '2px'
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3 }}>
        <Grid container spacing={3} className='mt-2'>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='Date And Time'
                  placeholder='Set Date And Time For'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <i className='ri-calendar-line' style={{ cursor: 'pointer' }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: 'white'
                    }
                  }}
                />
              </Grid>

              <Box
                sx={{
                  backgroundColor: theme.colorSchemes.light.palette.customColors.darkGray,
                  color: 'white',
                  paddingX: '30px',
                  fontWeight: '600',
                  marginTop: '24px',
                  marginLeft: '22px',
                  borderRadius: '5px',
                  paddingY: '6px',
                  fontSize: '0.875rem',
                  width: '100%'
                }}
              >
                Feedback
              </Box>
            </Grid>
          </Grid>

          {/*  */}
          <section className='border-1 border-black mt-[20px] ml-[14px] '>
            <Grid container spacing={2}>
              <Typography sx={{ marginLeft: '8px' }}>PMA2xxxx </Typography>

              <Grid item xs={12} md={12} sx={{ marginTop: '19px' }}>
                <TextField
                  fullWidth
                  type='text'
                  label='Feedback'
                  placeholder='Set Date And Time For'
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: 'white'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} sx={{ marginTop: '10px' }}>
                <FormControlLabel
                  control={
                    <Checkbox

                    // checked={isChecked}
                    // onChange={handleCheckboxChange}
                    />
                  }
                  label='I would prefer not to leave any feedback'
                />
              </Grid>

              {/*last feedback */}

              <Typography sx={{ marginLeft: '8px', marginTop: '20px' }}>PMA2xxxx </Typography>

              <Grid item xs={12} md={12} sx={{ marginTop: '19px' }}>
                <TextField
                  fullWidth
                  type='text'
                  label='Feedback'
                  placeholder='Set Date And Time For'
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: 'white'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} sx={{ marginTop: '10px' }}>
                <FormControlLabel
                  control={
                    <Checkbox

                    // checked={isChecked}
                    // onChange={handleCheckboxChange}
                    />
                  }
                  label='I would prefer not to leave any feedback'
                />
              </Grid>
            </Grid>

            <Typography sx={{ marginTop: '20px' }}>
              {' '}
              <span className='font-bold'> PMA1xxxx</span> will be in touch very soon to begin getting you set up as
              their new client. Thank you for using SMSC, and we look forward to supporting you through the transition
              process!
            </Typography>
          </section>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} sx={{ color: 'customColors.textGray' }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSendInvites}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            '&:hover': {
              backgroundColor: 'customColors.ligthBlue'
            }
          }}
        >
          Appoint Managing Agent
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AppointManagemnetModal
