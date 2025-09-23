'use client'

import React from 'react'

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import type { PainPointsSectionProps } from '../types'

const PainPointsSection: React.FC<PainPointsSectionProps> = ({ painPoints }) => {
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
        {painPoints?.map((painPoint, index) => (
          <Accordion
            key={painPoint.question_id}
            sx={{
              marginBottom: 2,
              border: '1px solid #E4A324 !important',
              borderRadius: '4px',
              '&:before': { display: 'none !important' },
              boxShadow: 'none !important',
              overflow: 'hidden',
              '& .MuiAccordionDetails-root': {
                borderTop: '1px solid #E4A324 !important'
              },
              ...(index === 0 && {
                '&:first-of-type': {
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px'
                }
              }),
              ...(index === painPoints.length - 1 && {
                '&:last-of-type': {
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px'
                }
              })
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
              <Typography sx={{ color: '#696969', fontSize: '14px' }}>{painPoint?.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
              <Typography variant='body2' color='text.secondary'>
                {painPoint?.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

export default PainPointsSection
