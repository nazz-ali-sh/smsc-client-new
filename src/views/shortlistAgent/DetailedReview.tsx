'use client'

import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Typography } from '@mui/material'
import Popover from '@mui/material/Popover'

import companyImage from '../../../public/images/customImages/company.png'

import phone from '../../../public/images/customImages/phone.svg'
import menuDots from '../../../public/images/manuDots.svg'

import phoneCalls from '../../../public/images/tenderShortlisted/phoneCalls.svg'
import videoCalls from '../../../public/images/tenderShortlisted/videoCall.svg'
import visitLocation from '../../../public/images/tenderShortlisted/visitLocation.svg'
import visitPerson from '../../../public/images/tenderShortlisted/visitPerson.svg'
import person from '../../../public/images/tenderShortlisted/person.svg'
import eye from '../../../public/images/tenderShortlisted/eye.svg'

import VideosCallsModal from '@/common/VideosCallsModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  console.log(numPages)

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
        {finalShortListedResponce?.data?.shortlisted_pmas?.map((company: any, index: number) => (
          <section
            key={index}
            className='flex justify-between items-center mt-8 border border-borderprimary p-[24px] rounded-xl'
          >
            {/* Left section */}
            <div
              onClick={() => router.push(`/shortlist-agent/${company?.pma_user?.id}`)}
              className='flex items-start gap-6 cursor-pointer'
            >
              <div className='flex flex-col'>
                <Image
                  src={companyImage}
                  alt={`${company.title} logo`}
                  width={180}
                  height={190}
                  className='rounded-xl'
                />

                <div className='mt-[19px] text-[12px] text-buttonPrimary font-bold text-center flex items-center justify-center '>
                  <Image src={eye} alt='eye' className='size-[18px] mr-[12px]' /> View Full Profile
                </div>
              </div>

              <div>
                <div className='text-[20px] font-bold leading-[42px]'>{company?.company_details?.name}</div>
                <div className='text-[12px] font-normal leading-[32px] text-buttonPrimary'>
                  {company?.company_details?.website}
                </div>

                {/* active  tabs  */}

                <section>
                  <div className='flex space-x-4'>
                    <button className='flex items-center space-x-2 px-[15px] py-1 rounded-full bg-blue-100 text-blue-500 font-semibold '>
                      <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                      <span>Call Booked</span>
                    </button>

                    <button className='px-6 py-3 rounded-full bg-[#6969691A] text-gray-400 font-semibold'>
                      Visit Arranged
                    </button>

                    <button className='px-6 py-3 rounded-full bg-[#6969691A] text-gray-400 font-semibold '>
                      Video Call
                    </button>
                  </div>
                </section>

                <Typography variant='h3' className='text-[#1F4E8D] text-[34px font-bold py-1'>
                  €150
                </Typography>

                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <Image src={person} alt='person' />
                  </span>
                  <Typography variant='body2'>{company?.pma_user?.full_name}</Typography>
                </div>
                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <i className='ri-mail-line size-[14px]'></i>
                  </span>
                  <Typography variant='body2'>{company?.pma_user?.email}</Typography>
                </div>

                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <Image src={phone} alt='phone' className='size-[14px]' />
                  </span>
                  <Typography variant='body2'>{company?.pma_user?.mobile_number}</Typography>
                </div>

                <div className='flex items-center gap-x-[30px]'>
                  <span>
                    <i className='ri-map-pin-line size-[14px]'></i>
                  </span>
                  <Typography variant='body2'>{company?.pma_user?.address}</Typography>
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

            {/* call to actions buttons  */}

            <section className='flex flex-col space-y-4'>
              <Image
                src={videoCalls}
                alt='videocalls'
                className='cursor-pointer'
                onClick={() => setOnlineCallsModalOpen(true)}
              />
              <Image
                src={visitLocation}
                alt='location'
                className='cursor-pointer'
                onClick={() => setSiteVisitsModalOpen(true)}
              />
              <Image
                src={phoneCalls}
                alt='phoneCalls'
                className='cursor-pointer'
                onClick={() => setSiteVisitsModalOpen(true)}
              />
              <Image
                src={visitPerson}
                alt='person'
                className='cursor-pointer'
                onClick={() => setApointAgentModalOpen(true)}
              />
            </section>
          </section>
        ))}

        <VideosCallsModal open={onlineCallsModalOpen} onClose={() => setOnlineCallsModalOpen(false)} />
        <SiteVisitsModal open={siteVisitsModalOpen} onClose={() => setSiteVisitsModalOpen(false)} />
        <AppointManagemnetModal open={apointAgentModalOpen} onClose={() => setApointAgentModalOpen(false)} />
      </section>
    </>
  )
}

export default DetailedReview
