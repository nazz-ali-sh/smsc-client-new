'use client'

import React from 'react'

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

const PainPointsSection = () => {
  return (
    <Box sx={{ marginBottom: 15, marginTop: '34px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 3 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '24px',
            color: 'customColors.darkGray1'
          }}
        >
          Pain Points
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '18px' }}>
        <Accordion
          sx={{
            marginBottom: 2,
            border: '1px solid #E4A324 !important',
            borderRadius: '4px',
            '&:before': { display: 'none !important' },
            boxShadow: 'none !important',
            overflow: 'hidden',
            '& .MuiAccordion-root': {
              border: '2px solid #E4A324 !important'
            },
            '& .MuiAccordionDetails-root': {
              borderTop: '1px solid #E4A324 !important'
            },
            '&:first-of-type': {
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<i className='ri-arrow-down-s-line' style={{ color: '#E4A324' }} />}
            sx={{
              backgroundColor: '#FFF7ED',
              padding: '12px 16px',
              '& .MuiAccordionSummary-content': {
                margin: 0
              }
            }}
          >
            <Typography sx={{ color: '#696969', fontSize: '14px' }}>
              What would you like to see done differently by a new managing agent?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
            <Typography variant='body2' color='text.secondary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            marginBottom: 2,
            border: '1px solid #E4A324 !important',
            borderRadius: '4px',
            '&:before': { display: 'none !important' },
            boxShadow: 'none !important',
            overflow: 'hidden',
            '& .MuiAccordion-root': {
              border: '2px solid #E4A324 !important'
            },
            '& .MuiAccordionDetails-root': {
              borderTop: '1px solid #E4A324 !important'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<i className='ri-arrow-down-s-line' style={{ color: '#E4A324' }} />}
            sx={{
              backgroundColor: '#FFF7ED',
              padding: '12px 16px',
              '& .MuiAccordionSummary-content': {
                margin: 0
              }
            }}
          >
            <Typography variant='body1' sx={{ color: '#696969' }}>
              Are there any systems, tools, or financial reporting features that would improve how your block is
              managed?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
            <Typography variant='body2' color='text.secondary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            marginBottom: 2,
            border: '1px solid #E4A324 !important',
            borderRadius: '4px',
            '&:before': { display: 'none !important' },
            boxShadow: 'none !important',
            overflow: 'hidden',
            '& .MuiAccordion-root': {
              border: '2px solid #E4A324 !important'
            },
            '& .MuiAccordionDetails-root': {
              borderTop: '1px solid #E4A324 !important'
            },
            '&:last-of-type': {
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<i className='ri-arrow-down-s-line' style={{ color: '#E4A324' }} />}
            sx={{
              backgroundColor: '#FFF7ED',
              padding: '12px 16px',
              '& .MuiAccordionSummary-content': {
                margin: 0
              }
            }}
          >
            <Typography variant='body1' sx={{ color: '#696969' }}>
              What service challenges have you experienced with your current managing agent?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
            <Typography variant='body2' color='text.secondary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}

export default PainPointsSection
