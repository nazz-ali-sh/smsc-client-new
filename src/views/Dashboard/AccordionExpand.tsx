import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

import { useSelector } from 'react-redux'

import { dashboardFaqs } from '@/services/dashboard-apis/dashboard-api'

import type { RootState } from '@/redux-store'

// Define the response types based on the API response
interface Faq {
  id: number
  question: string
  answer: string
  created_at: string
  updated_at: string
}

interface DashboardFaqsResponse {
  status: string
  message: string
  data: {
    total_count: number
    faqs: Faq[]
  }
}

export default function AccordionExpand() {
  const rmcTenderId = useSelector((state: RootState) => state?.users?.tenderId)

  const { data, isLoading, error } = useQuery<DashboardFaqsResponse, Error>({
    queryKey: ['dashboardFaqs', rmcTenderId],
    queryFn: () => dashboardFaqs(Number(rmcTenderId)), // Convert to number
    enabled: !!rmcTenderId
  })

  if (isLoading) {
    return (
      <div>
        <Typography variant='h3' className='text-center text-[#262B43E5] font-bold'>
          FAQ’s
        </Typography>
        <Typography variant='h6' className='text-center mb-[30px] text-[15px] text-[#262B43B2]'>
          Let us help answer the most common questions.
        </Typography>
        <Typography>Loading FAQs...</Typography>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Typography variant='h3' className='text-center text-[#262B43E5] font-bold'>
          FAQ’s
        </Typography>
        <Typography variant='h6' className='text-center mb-[30px] text-[15px] text-[#262B43B2]'>
          Let us help answer the most common questions.
        </Typography>
        <Typography>Error: {error.message}</Typography>
      </div>
    )
  }

  if (!data?.data.faqs || data.data.faqs.length === 0) {
    return (
      <div>
        <Typography variant='h3' className='text-center text-[#262B43E5] font-bold'>
          FAQ’s
        </Typography>
        <Typography variant='h6' className='text-center mb-[30px] text-[15px] text-[#262B43B2]'>
          Let us help answer the most common questions.
        </Typography>
        <Typography>No FAQs available.</Typography>
      </div>
    )
  }

  return (
    <>
      <Typography variant='h3' className='text-center text-[#262B43E5] font-bold'>
        FAQ’s
      </Typography>
      <Typography variant='h6' className='text-center mb-[30px] text-[15px] text-[#262B43B2]'>
        Let us help answer the most common questions.
      </Typography>

      <div>
        {data.data.faqs.map(faq => (
          <Accordion key={faq.id} defaultExpanded={faq.id === data.data.faqs[0].id}>
            <AccordionSummary
              expandIcon={<i className='ri-arrow-down-s-line'></i>}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
            >
              <Typography component='span'>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  )
}

