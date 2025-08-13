import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

import { useSelector } from 'react-redux'

import { dashboardFaqs } from '@/services/dashboard-apis/dashboard-api'

import type { RootState } from '@/redux-store'

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
    queryFn: () => dashboardFaqs(Number(rmcTenderId)),
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
    const defaultFaqs = [
      {
        id: 1,
        question: 'What counts towards the 100 responses limit?',
        answer:
          'The 100 responses limit includes all tender responses received from managing agents. This includes both complete and incomplete submissions, as well as responses that may be withdrawn or modified during the tender process.'
      },
      {
        id: 2,
        question: 'How do you process payments?',
        answer:
          'Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet. Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.'
      },
      {
        id: 3,
        question: 'Do you have a money-back guarantee?',
        answer:
          "Yes, we offer a comprehensive money-back guarantee for our services. If you're not satisfied with the results within 30 days of service completion, we provide a full refund of your payment."
      },
      {
        id: 4,
        question: 'I have more questions. Where can I get help?',
        answer:
          'You can reach our support team through multiple channels: email at support@example.com, phone at +1-800-123-4567, or through our live chat feature available on our website during business hours.'
      }
    ]

    return (
      <>
        <Typography variant='h3' className='text-center text-[#262B43E5] font-bold'>
          FAQ's
        </Typography>
        <Typography variant='h6' className='text-center mb-[30px] text-[15px] text-[#262B43B2]'>
          Let us help answer the most common questions.
        </Typography>

        <div className='space-y-4'>
          {defaultFaqs.map(faq => (
            <Accordion
              key={faq.id}
              sx={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<i className='ri-arrow-down-s-line'></i>}
                aria-controls={`panel${faq.id}-content`}
                id={`panel${faq.id}-header`}
              >
                <Typography
                  component='span'
                  sx={{
                    color: '#262B43E5',
                    fontSize: '15px'
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: '#696969B2',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </>
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

      <div className='space-y-4'>
        {data.data.faqs.map(faq => (
          <Accordion
            key={faq.id}
            sx={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:before': {
                display: 'none'
              }
            }}
          >
            <AccordionSummary
              expandIcon={<i className='ri-arrow-down-s-line'></i>}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
            >
              <Typography
                component='span'
                sx={{
                  color: '#262B43E5',
                  fontSize: '15px',
                  fontWeight: 400
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  color: '#696969B2',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  )
}
