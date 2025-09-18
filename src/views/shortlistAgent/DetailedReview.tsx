'use client'

import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Typography } from '@mui/material'

import { useMutation } from '@tanstack/react-query'

import dayjs from 'dayjs'

import companyImage from '../../../public/images/customImages/company.png'

import phone from '../../../public/images/customImages/phone.svg'

import phoneCalls from '../../../public/images/tenderShortlisted/phoneCalls.svg'
import videoCalls from '../../../public/images/tenderShortlisted/videoCall.svg'
import visitLocation from '../../../public/images/tenderShortlisted/visitLocation.svg'
import visitPerson from '../../../public/images/tenderShortlisted/visitPerson.svg'
import extend3days from '../../../public/images/tenderShortlisted/extend3days.svg'
import person from '../../../public/images/tenderShortlisted/person.svg'
import eye from '../../../public/images/tenderShortlisted/eye.svg'

import VideosCallsModal from '@/common/VideosCallsModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import ShortListAgent from '../../common/ShortListAgent'
import ContactModal from '@/common/ContactModal'
import { rmcsendContactpma } from '@/services/tender_result-apis/tender-result-api'

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [shortlistedModalOpen, setShortListedSuccessModalOpen] = useState(false)
  const [pmaSelectedID, setPmaSelectedID] = useState<number | any>()
  const [isClient, setIsClient] = useState(false)

  const [expireDates, setExpireDates] = useState<{ days: string; hours: string; minutes: string }[]>([])

  const [selectedPma, setSelectedPma] = useState<{ id: number; pma_number: string } | null>(null)

  useEffect(() => {
    if (!finalShortListedResponce?.data?.shortlisted_pmas) return

    const now = dayjs()

    const calculated = finalShortListedResponce.data.shortlisted_pmas.map((company: any) => {
      const target = dayjs(company.shortlisting_expiry_at)
      const diff = target.diff(now)

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      return {
        days: days.toString(),
        hours: hours.toString(),
        minutes: minutes.toString()
      }
    })

    setExpireDates(calculated)
  }, [finalShortListedResponce])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  console.log(numPages)

  const handkeAppointAgnet = (selected_pma_id: any) => {
    setPmaSelectedID(selected_pma_id)
    setApointAgentModalOpen(true)
  }

  const handleExtendByThree = (selected_pma_id: any) => {
    setPmaSelectedID(selected_pma_id)
    setShortListedSuccessModalOpen(true)
  }

  const sendContactPmaMutation = useMutation({
    mutationFn: ({ pma_user_id, message }: { pma_user_id: number; message: string }) =>
      rmcsendContactpma(pma_user_id, message),

    onSuccess: data => {
      console.log('Contact sent successfully:', data)
      setContactModalOpen(true)
    },

    onError: error => {
      console.error('Error sending contact:', error)
    }
  })

  const handlecontactAgent = (selected_pma_id: number) => {
    setPmaSelectedID(selected_pma_id)

    sendContactPmaMutation.mutate({
      pma_user_id: Number(selected_pma_id),
      message: 'Send the Email'
    })
  }

  const handleVideoCallClick = (company: any) => {
    setOnlineCallsModalOpen(true)
    setSelectedPma({
      id: company?.pma_user?.id,
      pma_number: company?.pma_user?.pma_number
    })
  }

  const handleSiteVisitclick = (company: any) => {
    setSiteVisitsModalOpen(true)
    setSelectedPma({
      id: company?.pma_user?.id,
      pma_number: company?.pma_user?.pma_number
    })
  }

  return (
    <>
      <div className='pb-[70px]'>
        <section className=' mt-8 '>
          {finalShortListedResponce?.data?.shortlisted_pmas?.map((company: any, index: number) => (
            <section key={index} className='flex justify-between items-center mt-8 shadow-md  rounded-xl px-6 py-4'>
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
                  <Typography variant='h3' className='text-[#1F4E8D] text-[34px] font-bold py-1'>
                    €150
                  </Typography>
                  <div className='text-[20px] font-bold leading-[42px]'>{company?.company_details?.name}</div>
                  <div className='text-[12px] font-normal leading-[32px] text-buttonPrimary'>
                    {company?.company_details?.website}
                  </div>

                  <section className='pb-4'>
                    <div className='flex space-x-4'>
                      <div className='flex items-center space-x-2 px-[15px] py-0 rounded-full bg-[#DDF6FE]  font-semibold '>
                        <span className='w-2 h-2 bg-[#26C6F9] rounded-full pt-1'></span>
                        <span className='text-[#26C6F9] font-medium text-xs '>Call Booked</span>
                      </div>

                      <button className='px-6 py-1 rounded-full bg-[#6969691A] text-gray-400 font-medium text-xs'>
                        Visit medium
                      </button>

                      <button className='px-6 py-1 rounded-full bg-[#6969691A] text-gray-400 font-medium text-xs'>
                        Video Call
                      </button>
                    </div>
                  </section>

                  <Typography variant='h3' className='text-[#1F4E8D] text-[21px] font-bold py-1'>
                    {expireDates[index]?.days} days _ {expireDates[index]?.hours} hours _ {expireDates[index]?.minutes}{' '}
                  </Typography>
                </div>
                <div className='pl-10'>
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

              <div className='flex items-start'>
                <section className='relative flex flex-col justify-between items-center w-[100%]'>
                  <section>
                    <div
                      className='relative cursor-pointer'
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {isClient && (
                        <Document
                          file={`/${company.pdf}`}
                          onLoadSuccess={onDocumentLoadSuccess}
                          onLoadError={error => console.error('Error loading PDF:', error)}
                        >
                          <Page pageNumber={1} width={160} height={145} />
                        </Document>
                      )}
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
              </div>

              <section className='flex flex-col space-y-4'>
                <Image
                  src={videoCalls}
                  alt='videocalls'
                  className='cursor-pointer'
                  onClick={() => handleVideoCallClick(company)}
                />
                <Image
                  src={visitLocation}
                  alt='location'
                  className='cursor-pointer'
                  onClick={() => handleSiteVisitclick(company)}
                />
                <Image
                  src={phoneCalls}
                  alt='phoneCalls'
                  className='cursor-pointer'
                  onClick={() => handlecontactAgent(company?.pma_user?.id)}
                />
                <Image
                  src={visitPerson}
                  alt='person'
                  className='cursor-pointer'
                  onClick={() => handkeAppointAgnet(company?.pma_user?.id)}
                />

                <section className='flex bg-[#26C6F93D] p-3 rounded-md'>
                  <Image
                    src={extend3days}
                    alt='person'
                    className='cursor-pointer'
                    onClick={() => handleExtendByThree(company?.pma_user?.id)}
                  />
                </section>
              </section>
            </section>
          ))}
          <VideosCallsModal
            open={onlineCallsModalOpen}
            onClose={() => setOnlineCallsModalOpen(false)}
            shorlistedPmas={finalShortListedResponce?.data?.shortlisted_pmas}
            mainSiteVisitVideoCalls={undefined}
            defaultmultiselect={selectedPma}
          />
          <SiteVisitsModal
            open={siteVisitsModalOpen}
            defaultmultiselect={selectedPma}
            onClose={() => setSiteVisitsModalOpen(false)}
            types={null}
            shorlistedPmas={finalShortListedResponce?.data?.shortlisted_pmas}
          />
          <AppointManagemnetModal
            open={apointAgentModalOpen}
            onClose={() => setApointAgentModalOpen(false)}
            finalShortListedResponce={finalShortListedResponce}
            pmaSelectedID={pmaSelectedID}
            InviteCompletedCalls={undefined}
          />

          <ContactModal onClose={() => setContactModalOpen(false)} open={contactModalOpen} />

          <ShortListAgent
            open={shortlistedModalOpen}
            onClose={() => setShortListedSuccessModalOpen(false)}
            pmaSelectedID={pmaSelectedID}
          />
        </section>
      </div>
    </>
  )
}

export default DetailedReview
