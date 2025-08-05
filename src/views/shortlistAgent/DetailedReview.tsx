'use client'

import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Rating, Typography } from '@mui/material'
import Popover from '@mui/material/Popover'

import companyImage from '../../../public/images/customImages/company.png'

import phone from '../../../public/images/customImages/phone.svg'
import menuDots from '../../../public/images/manuDots.svg'

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Document })), {
  ssr: false,
  loading: () => <div className='w-[160px] h-[145px] bg-gray-200 animate-pulse rounded'></div>
})

const Page = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Page })), {
  ssr: false
})

interface agenetProps {
  data: any
  shortlist_id: number
  tender_id: number
  tender_name: string
  shortlisted_pma_count: number
  shortlisted_pma_users: {
    id: number
    pma_number: string
    full_name: string
    email: string
    mobile_number: string
    company_name: string
  }[]
  shortlisted_by: {
    id: number
    name: string | null
    email: string
  }
}

const DetailedReview = ({ finalShortListedResponce }: { finalShortListedResponce: agenetProps }) => {
  const router = useRouter()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null) // Track hovered PDF index
  const [isClient, setIsClient] = useState(false)

  console.log(numPages, 'numPages')

  useEffect(() => {
    setIsClient(true)
  }, [])

  console.log('finalShortListedResponce', finalShortListedResponce)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as any)
  }

  return (
    <>
      <section className='pb-[70px]'>
        {finalShortListedResponce?.data?.shortlisted_pma_users?.map((company: any, index: number) => (
          <section
            key={index}
            className='flex justify-between items-center mt-8 border border-borderprimary p-[24px] rounded-xl'
          >
            {/* Left section */}
            <div
              onClick={() => router.push(`/shortlist-agent/${company.id}`)}
              className='flex items-center gap-6 cursor-pointer'
            >
              <div>
                <Image src={companyImage} alt={`${company.title} logo`} width={180} height={190} />
              </div>
              <div>
                <div className='text-[20px] font-bold leading-[42px]'>{company.company_name}</div>
                <Rating value={company.rating} readOnly size='small' />
                <Typography variant='body2'>{`${company?.rating} Star | ${company?.reviews} Reviews`}</Typography>

                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <i className='ri-mail-line size-[14px]'></i>
                  </span>
                  <Typography variant='body2'>www.strategisthub.com</Typography>
                </div>
                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <Image src={phone} alt='phone' className='size-[14px]' />
                  </span>
                  <Typography variant='body2'>{company.mobile_number}</Typography>
                </div>
                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <i className='ri-chat-4-line size-[14px]'></i>
                  </span>
                  <Typography variant='body2'>{company.email}</Typography>
                </div>
                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <i className='ri-map-pin-line size-[14px]'></i>
                  </span>
                  <Typography variant='body2'>{company.location}</Typography>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className='flex items-start'>
              <section className='relative flex flex-col justify-between items-center w-[100%]'>
                {/* left section  */}

                <section>
                  <div
                    className='relative cursor-pointer'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* PDF Thumbnail */}
                    {isClient && (
                      <Document
                        file={`/${company.pdf}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={error => console.error('Error loading PDF:', error)}
                      >
                        <Page pageNumber={1} width={160} height={145} />
                      </Document>
                    )}

                    {/* Hover Preview */}
                    {hoveredIndex === index && isClient && (
                      <div className='absolute top-0 left-0 z-10 bg-white shadow-lg border border-gray-200'>
                        <Document
                          file={`/${company.pdf}`}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={error => console.error('Error loading PDF:', error)}
                        >
                          <Page pageNumber={1} width={300} height={390} />
                        </Document>
                      </div>
                    )}
                  </div>

                  {/* Download Link */}
                  <section className='w-[100%]'>
                    <Typography variant='body1' align='center' className='mt-2 cursor-pointer'>
                      <a
                        href={`/${company.pdf}`}
                        download
                        className='hover:underline hover:underline-offset-4'
                        style={{ textDecorationColor: '#35C0ED' }}
                      >
                        Download PDF
                      </a>
                    </Typography>
                  </section>
                </section>
              </section>

              {/* Right three dot menu  */}
              <section>
                <div>
                  <div aria-describedby={id} onClick={e => handleClick(e)}>
                    <Image src={menuDots} alt='menu dots' className='cursor-pointer' />
                  </div>

                  <Popover
                    id={id}
                    open={open}
                    anchorReference='anchorPosition'
                    anchorPosition={{ top: 480, left: 1370 }}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: '#35C0ED'
                        }
                      }}
                    >
                      <div className='flex items-center justify-start gap-x-3'>
                        <span>
                          <i className='ri-user-3-line'></i>
                        </span>
                        <span> View Agent Details</span>
                      </div>
                    </Typography>
                    <Typography
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: '#35C0ED'
                        }
                      }}
                    >
                      <div className='flex items-center justify-start gap-x-3'>
                        <span>
                          <i className='ri-phone-line'></i>
                        </span>
                        <span> Request A Call Back</span>
                      </div>
                    </Typography>
                    <Typography
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: '#35C0ED'
                        }
                      }}
                    >
                      <div className='flex items-center justify-start gap-x-3'>
                        <span>
                          <i className='ri-chat-3-line'></i>
                        </span>
                        <span>Message Managing Agent</span>
                      </div>
                    </Typography>
                    <Typography
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: '#35C0ED'
                        }
                      }}
                    >
                      <div className='flex items-center justify-start gap-x-3'>
                        <span>
                          <i className='ri-calendar-line'></i>
                        </span>
                        <span>Schedule A Video Call</span>
                      </div>
                    </Typography>
                    <Typography
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: '#35C0ED'
                        }
                      }}
                    >
                      <div className='flex items-center justify-start gap-x-3'>
                        <span>
                          <i className='ri-contacts-book-3-line'></i>
                        </span>
                        <span>Book A site Visit</span>
                      </div>
                    </Typography>
                  </Popover>
                </div>
              </section>
            </div>
          </section>
        ))}
      </section>
    </>
  )
}

export default DetailedReview
