import React from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton, useTheme, Divider } from '@mui/material'

interface ToolTipModalProps {
  open: boolean
  onClose: () => void
  type: string
}

const ToolTipModal: React.FC<ToolTipModalProps> = ({ open, onClose, type }) => {
  const theme = useTheme()

  const recommandedStep = [
    {
      title: 'Initial Contact via Video Call:',
      description:
        'We recommend starting with a video call for a preliminary discussion. Use our meeting request form to ensure your invitation reaches them. Video calls help narrow down serious contenders before moving to in-person site visits.'
    },
    {
      title: 'Use Our Evaluation Matrix:',
      description:
        'Download and use our editable Evaluation Matrix to score each  agent objectively. This tool will help you assess their suitability  based on your block’s unique needs.'
    },
    {
      title: 'Site Visit Stage:',
      description:
        'After video calls, invite your top choices for a site visit. This will give them an opportunity to understand the property and allow you to see their approach firsthand.'
    },
    {
      title: 'Setting a Service Level Agreement (SLA):',
      description:
        'Remember to set clear service expectations by establishing an SLA prior to speaking with your shortlisted agents. This helps outline key performance indicators (KPIs) for the managing agent to work towards'
    }
  ]

  const consideration = [
    {
      title: 'Be Cautious with Online Reviews:',
      description:
        'Reviews may be biased or written by residents who don’t fully understand the financial constraints set by directors. Consider the context and duration the company has been operating to get a balanced view.'
    },
    {
      title: 'Select an Agent You Connect With:',
      description:
        'Do you prefer being a priority for a smaller agent or having the resources of a larger one, even if it means being less of a focus?'
    },
    {
      title: '',
      description:
        'After video calls, invite your top choices for a site visit. This will give them an opportunity to understand the property and allow you to see their approach firsthand.'
    },
    {
      title: '',
      description:
        'Remember, your goal is to find an agent who understands your needs and can deliver the level of service you expect, not just one with the flashiest sales pitch.'
    }
  ]

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
                Recommended Next steps
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
                  paddingY: '6px',
                  fontSize: '0.875rem'
                }}
              >
                Recommended Next steps
              </Box>

              <>
                <Box
                  sx={{
                    borderTop: 'none',
                    padding: '12px'
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem', color: '#696969', marginBottom: '8px' }}
                  >
                    Shortlisted Agents Info
                  </Typography>

                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                    Once you've shortlisted your preferred agents, we recommend starting with video calls to get an
                    initial feel for each company. After the video calls, you can then invite the agents you'd like to
                    meet in person to carry out a site visit.
                  </Typography>

                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                    If you'd like others to join the video calls — such as fellow directors or leaseholders — you can
                    invite them from the video call section of your portal.
                  </Typography>

                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: '500', fontSize: '0.875rem' }}>
                    Don’t forget: using the evaluation matrix is a great way to score each agent’s suitability and keep
                    track of your impressions throughout the process.
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
