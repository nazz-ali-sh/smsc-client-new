'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Box, Card, CardContent, Typography, Button, Collapse } from '@mui/material'

import { Document, Page, pdfjs } from 'react-pdf'

import type { RmcData } from '../types/data'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

interface RmcSidebarProps {
  rmcData: RmcData
}

const userData = {
  firstName: 'RMCxxxxx',
  userName: '@shallamb',
  billingEmail: 'shallamb@gmail.com',
  status: 'active',
  role: 'Subscriber',
  taxId: 'Tax-8894',
  contact: '+1 (234) 464-0600',
  language: ['English'],
  country: 'France',
  useAsBillingAddress: true
}

const RmcSidebar: React.FC<RmcSidebarProps> = () => {
  const [contactInfoExpanded, setContactInfoExpanded] = React.useState(true)

  const [numPages, setNumPages] = useState<number | null>(null)

  console.log(numPages, 'numPages')

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <Card sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', marginX: '10px' }}>
        <div className='flex flex-col gap-y-6'>
          <div className='flex flex-col items-center justify-center gap-y-4 mt-4 '>
            <Image
              alt='user-profile'
              src='/images/customImages/company.png'
              className='rounded-lg'
              width={120}
              height={120}
            />
            <Typography variant='h5'>{`${userData.firstName} `}</Typography>

            <section className='flex items-center gap-x-[20px] '>
              <Typography variant='body2'>
                <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                  <i className='ri-phone-line'></i>
                </div>
              </Typography>

              <Typography variant='body2'>
                <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                  <i className='ri-chat-4-line'></i>
                </div>
              </Typography>

              <Typography variant='body2'>
                <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                  <i className='ri-chat-3-line'></i>
                </div>
              </Typography>
              <Typography variant='body2'>
                <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                  <i className='ri-calendar-line'></i>
                </div>
              </Typography>
              <Typography variant='body2'>
                <div className='flex items-center justify-center p-1 rounded-full bg-[#f4f4f4]'>
                  <i className='ri-contacts-book-3-line'></i>
                </div>
              </Typography>
            </section>
          </div>

          <Box sx={{ marginTop: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '12px 0'
              }}
              onClick={() => setContactInfoExpanded(!contactInfoExpanded)}
            >
              <Typography variant='h6' sx={{ fontWeight: 500, color: '#333' }}>
                Contact Info
              </Typography>
              <i
                className={`ri-arrow-down-s-line ${contactInfoExpanded ? 'rotate-180' : ''}`}
                style={{
                  fontSize: '1.25rem',
                  color: '#333',
                  transition: 'transform 0.3s ease'
                }}
              />
            </Box>

            <Collapse in={contactInfoExpanded}>
              <Box sx={{ paddingLeft: 1 }}>
                <Typography variant='body2' className='flex items-start mt-2'>
                  <i className='ri-mail-line mr-[14px]' style={{ color: '#666' }}></i>
                  Debra.holt@example.com
                </Typography>

                <Typography variant='body2' className='flex items-start mt-3'>
                  <i className='ri-phone-line mr-[14px]' style={{ color: '#666' }}></i>
                  (219) 555-0114 (Primary)
                </Typography>

                <Typography variant='body2' className='flex items-start mt-3'>
                  <i className='ri-map-pin-line mr-[14px]' style={{ color: '#666' }}></i>
                  417 Washington Ave. Manchester, Kentucky 39495
                </Typography>
              </Box>
            </Collapse>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
            <Button variant='contained' className='bg-buttonPrimary gap-x-1'>
              <i className='ri-user-3-line size-[22px]'></i>
              Download Profile
            </Button>

            <Button variant='contained' className='bg-buttonPrimary gap-x-1'>
              <i className='ri-eye-line size-[22px] '></i>
              View Questionaire
            </Button>
          </Box>
        </div>

        <section className='flex flex-col items-center gap-4'>
          <div className='border rounded shadow-md mt-10'>
            <Document
              file='/data.pdf'
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={error => console.error('Error loading PDF:', error)}
              loading={<Typography>Loading PDF preview...</Typography>}
              className='cursor-pointer'
            >
              <Page pageNumber={1} width={300} />
            </Document>
          </div>
          <Typography variant='body1' align='center'>
            <a
              href='data.pdf'
              download
              className='hover:underline hover:underline-offset-4'
              style={{ textDecorationColor: '#35C0ED' }}
            >
              Download PDF
            </a>
          </Typography>
        </section>
      </CardContent>
    </Card>
  )
}

export default RmcSidebar
