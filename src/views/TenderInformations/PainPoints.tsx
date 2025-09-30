'use client'

import React from 'react'

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

interface PainPoint {
  question_id: number
  question: string
  answer: string
}

interface PainPointsSectionProps {
  painPoints: PainPoint[]
}

const PainPoints: React.FC<PainPointsSectionProps> = ({ painPoints }) => {
  return (
    <>
      <Typography className='text-[#262B43E5] font-bold  text-[18px]'>RMC Pain points</Typography>

      <Box sx={{ marginBottom: 15, marginTop: '34px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '18px' }}>
          {painPoints?.map((q, index) => (
            <Accordion
              key={q.question_id}
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
                  '& .MuiAccordionSummary-content': { margin: 0 }
                }}
              >
                <Typography sx={{ color: '#696969', fontSize: '14px' }}>{q?.question}</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: 'white', padding: '16px' }}>
                <Typography variant='body2' color='text.secondary'>
                  {q?.answer || 'No answer provided'}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default PainPoints
