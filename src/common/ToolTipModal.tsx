import React from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, useTheme, Divider } from '@mui/material'

import { consideration, recommandedStep } from '@/constants'

interface ToolTipModalProps {
  open: boolean
  onClose: () => void
  type: string
}

const ToolTipModal: React.FC<ToolTipModalProps> = ({ open, onClose, type }) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '320px',
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
            {type == 'shortList_agent' ? ' Next Steps for Vetting Your Shortlisted Agents' : 'Shortlisted Agents Info'}
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
        {type == 'shortList_agent' ? (
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
                  Recommended Next steps
                </Box>
                {recommandedStep?.map((item, index) => {
                  return (
                    <>
                      <Box
                        key={index}
                        sx={{
                          borderTop: 'none',
                          padding: '12px'
                        }}
                      >
                        <Typography
                          variant='body2'
                          sx={{
                            mb: 0.5,
                            fontWeight: '500',
                            fontSize: '0.875rem',
                            color: '#696969',
                            marginBottom: '8px'
                          }}
                        >
                          {item?.title}
                        </Typography>

                        <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                          {item?.description}
                        </Typography>
                      </Box>
                    </>
                  )
                })}
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
                Important Considerations{' '}
              </Box>
              {consideration?.map((item, index) => {
                return (
                  <>
                    <Box
                      key={index}
                      sx={{
                        borderTop: 'none',
                        padding: '12px'
                      }}
                    >
                      <Typography
                        variant='body2'
                        sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem', color: '#696969', marginBottom: '8px' }}
                      >
                        {item?.title}
                      </Typography>

                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                        {item?.description}
                      </Typography>
                    </Box>
                  </>
                )
              })}
            </Box>
          </Box>
        ) : type == 'shortList_agent_info' ? (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: theme.colorSchemes.light.palette.customColors.darkGray,
                  color: 'white',
                  paddingX: '10px',
                  fontWeight: '600',
                  borderRadius: '5px',
                  paddingY: '5px',
                  fontSize: '0.875rem'
                }}
              >
                Info
              </Box>

              <>
                <Box
                  sx={{
                    borderTop: 'none',
                    marginTop: 10
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5, fontWeight: '400', fontSize: '0.875rem', lineHeight: '22px' }}
                  >
                    Once you've shortlisted your preferred agents, we recommend starting with video calls to get an
                    initial feel for each company. After the video calls, you can then invite the agents you'd like to
                    meet in person to carry out a site visit.
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5, fontWeight: '400', fontSize: '0.875rem', lineHeight: '22px', marginTop: '20px' }}
                  >
                    If you'd like others to join the video calls — such as fellow directors or leaseholders — you can
                    invite them from the video call section of your portal. Don’t forget: using the evaluation matrix is
                    a great way to score each agent’s suitability and keep track of your impressions throughout the
                    process.
                  </Typography>
                </Box>
              </>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ToolTipModal
