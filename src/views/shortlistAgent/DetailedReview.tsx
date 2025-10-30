'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Typography } from '@mui/material'

import { useMutation } from '@tanstack/react-query'

import companyImage from '../../../public/images/customImages/company.png'

import phone from '../../../public/images/customImages/phone.svg'

import phoneCalls from '../../../public/images/tenderShortlisted/phoneCalls.svg'
import videoCalls from '../../../public/images/tenderShortlisted/videoCall.svg'
import visitLocation from '../../../public/images/tenderShortlisted/visitLocation.svg'
import person from '../../../public/images/tenderShortlisted/person.svg'
import whiteperson from '../../../public/images/dashboardImages/appintagentIcon.svg'

import VideosCallsModal from '@/common/VideosCallsModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import ShortListAgent from '../../common/ShortListAgent'
import ContactModal from '@/common/ContactModal'
import { rmcsendContactpma } from '@/services/tender_result-apis/tender-result-api'
import demePfd from '../../../public/images/dashboardImages/demePdfImage.png'
import CustomButton from '@/common/CustomButton'
import CustomTooltip from '@/common/CustomTooltip'
import { calculateTimeLeft } from '@/utils/dateFormater'

const DetailedReview = ({ finalShortListedResponce }: { finalShortListedResponce: any }) => {
  const router = useRouter()
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [shortlistedModalOpen, setShortListedSuccessModalOpen] = useState(false)
  const [shortlisted_pmaselectedID, setshortlisted_pmaselectedID] = useState<number | any>()
  const [pmaCompanyName, setPmaCompanyName] = useState<string | any>('')

  const [selectedPma, setSelectedPma] = useState<{ id: number; pma_number: string } | null>(null)

  const extendedCheck = Array.isArray(finalShortListedResponce?.data?.shortlisted_pmas)
    ? (finalShortListedResponce.data.shortlisted_pmas[0]?.shortlisting_extended ?? false)
    : false

  const expiryAt =
    Array.isArray(finalShortListedResponce?.data?.shortlisted_pmas) &&
    finalShortListedResponce.data.shortlisted_pmas.length > 0
      ? finalShortListedResponce.data.shortlisted_pmas[0]?.shortlisting_expiry_at
      : null

  const shortlistexpiryDate = calculateTimeLeft(expiryAt || '')

  const handkeAppointAgnet = (selected_pma_id: any, pmaCompanyName: string) => {
    setshortlisted_pmaselectedID(selected_pma_id)
    setPmaCompanyName(pmaCompanyName)
    setApointAgentModalOpen(true)
  }

  const handleExtendByThree = (selected_pma_id: any) => {
    setshortlisted_pmaselectedID(selected_pma_id)
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

  const handlecontactAgent = (selected_pma_id: number, pmaCompanyName: string) => {
    setPmaCompanyName(pmaCompanyName)
    setshortlisted_pmaselectedID(selected_pma_id)

    sendContactPmaMutation.mutate({
      pma_user_id: Number(selected_pma_id),
      message: 'Send the Email'
    })
  }

  const handleVideoCallClick = (company: any) => {
    setOnlineCallsModalOpen(true)
    setSelectedPma({
      id: company?.pma_user?.id,
      pma_number: company?.pma_user?.full_name
    })
  }

  const handleSiteVisitclick = (company: any) => {
    setSiteVisitsModalOpen(true)
    setSelectedPma({
      id: company?.pma_user?.id,
      pma_number: company?.pma_user?.full_name
    })
  }

  const pmaIds = finalShortListedResponce?.data?.shortlisted_pmas
    ?.map((item: { pma_user?: { id?: number } }) => item?.pma_user?.id)
    ?.filter((id: number | undefined): id is number => typeof id === 'number')

  const appointmnetStatus = finalShortListedResponce?.data?.tender_stage

  return (
    <>
      <div className='pb-[70px]'>
        <section className=' mt-8 '>
          {finalShortListedResponce?.data?.shortlisted_pmas?.map((company: any, index: number) => (
            <section key={index} className='flex justify-between items-center mt-8 shadow-md  rounded-xl px-6 py-4'>
              <div className='flex items-start gap-6 cursor-pointer'>
                <div className='flex flex-col'>
                  <Image
                    onClick={() => router.push(`/shortlist-agent/${company?.pma_user?.id}`)}
                    src={companyImage}
                    alt={`${company.title} logo`}
                    width={180}
                    height={212}
                    className='rounded-xl'
                  />

                  <div className='mt-[27px] text-[12px] text-buttonPrimary font-bold text-center flex items-center justify-center '>
                    <div className='flex items-center'>
                      <CustomButton
                        disabled={appointmnetStatus === 'appointment'}
                        onClick={() => handkeAppointAgnet(company?.pma_user?.id, company?.company_details?.name)}
                      >
                        <Image src={whiteperson} alt='person' className='mr-[10px]' />
                        Appoint the agent
                      </CustomButton>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant='h3' className='text-[#1F4E8D] text-[34px] font-bold pb-1'>
                    €{company?.fee_amount}
                  </Typography>
                  <div
                    className={`text-[22px] font-bold leading-[32px] ${shortlistexpiryDate?.minutes == '0' ? 'mt-[14px]' : ''}`}
                  >
                    {company?.company_details?.name}
                  </div>
                  <div
                    className={`text-[17px] font-normal leading-[32px] text-[#1F4E8D]  ${shortlistexpiryDate?.minutes == '0' ? 'mt-[21px]' : 'mt-[5px]'} `}
                  >
                    {company?.company_details?.website || 'No webite'}
                  </div>

                  <section className={`pb-4  ${shortlistexpiryDate?.minutes == '0' ? 'mt-[26px]' : 'mt-4'} `}>
                    <div className='flex space-x-4'>
                      <div
                        className={`flex items-center space-x-2 px-[15px] py-0 rounded-full ${company?.video_call_booked ? 'bg-[#f1f1f1]' : 'bg-[#26C6F929]'} font-semibold `}
                      >
                        <span
                          className={`w-2 h-2  ${!company?.video_call_booked ? 'bg-[#26C6F9]' : 'bg-[#bbbbbb]'} rounded-full pt-1`}
                        ></span>
                        <span
                          className={` ${!company?.video_call_booked ? 'text-[#26C6F9]' : 'text-[#bbbbbb]'} font-medium text-xs `}
                        >
                          {!company?.video_call_booked ? 'Not Contacted' : 'Not Contacted'}
                        </span>
                      </div>

                      <div
                        className={`flex items-center space-x-2 px-[15px] py-0 rounded-full ${company?.video_call_booked ? 'bg-[#DDF6FE]' : 'bg-[#6969691A] '}   font-semibold `}
                      >
                        <span
                          className={`w-2 h-2 ${company?.video_call_booked ? 'bg-[#26C6F9]' : 'bg-[#bbbbbb] '}  rounded-full pt-1`}
                        ></span>
                        <span
                          className={` ${company?.video_call_booked ? 'text-[#26C6F9]' : 'text-[#69696966]'} font-medium text-xs py-1 `}
                        >
                          Call Booked
                        </span>
                      </div>

                      <div
                        className={`flex items-center space-x-2 px-[15px] py-0 rounded-full ${company?.site_visit_booked ? 'bg-[#DDF6FE]' : 'bg-[#6969691A] '} font-semibold `}
                      >
                        <span
                          className={`w-2 h-2 ${company?.site_visit_booked ? 'bg-[#26C6F9]' : 'bg-[#bbbbbb]'}  rounded-full pt-1`}
                        ></span>
                        <span
                          className={` ${company?.site_visit_booked ? 'text-[#26C6F9]' : 'text-[#69696966]'} font-medium text-xs `}
                        >
                          Visit Arranged
                        </span>
                      </div>
                    </div>
                  </section>

                  {shortlistexpiryDate?.minutes == '0' ? (
                    ''
                  ) : (
                    <>
                      <div className='flex gap-2 items-center cursor-default'>
                        <Typography variant='h3' className='text-[#1F4E8D] text-[21px] font-bold py-1'>
                          {shortlistexpiryDate?.days !== '0' && <span>{shortlistexpiryDate?.days} days </span>}
                          {shortlistexpiryDate?.hours !== '0' && <span>{shortlistexpiryDate?.hours} hours </span>}
                          {shortlistexpiryDate?.minutes !== '0' && (
                            <span> {shortlistexpiryDate?.minutes} minutes </span>
                          )}
                        </Typography>
                        <CustomTooltip
                          text='During this time period, your contact information will be hidden. This setting is in place to allow you to initiate video calls securely.'
                          position='right'
                          align='right'
                          width='350px'
                        >
                          <i className='ri-information-line text-[#1F4E8D] cursor-default'></i>
                        </CustomTooltip>
                      </div>

                      <div className='mt-[20px]'>
                        <CustomButton
                          disabled={extendedCheck === true}
                          onClick={() => handleExtendByThree(company?.pma_user?.id)}
                          variant='outlined'
                        >
                          Extend by 3 days
                        </CustomButton>
                      </div>
                    </>
                  )}
                </div>
                <div className='pl-10 pt-[50px]'>
                  <Typography variant='h4'>Contact Details</Typography>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <div>
                      <Image src={person} alt='person' />
                    </div>
                    <Typography variant='body2'>{company?.pma_user?.full_name}</Typography>
                  </div>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <span>
                      <i className='ri-mail-line size-[14px]'></i>
                    </span>
                    <Typography variant='body2'>{company?.pma_user?.email}</Typography>
                  </div>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <span>
                      <Image src={phone} alt='phone' className='size-[14px]' />
                    </span>
                    <Typography variant='body2'>{company?.pma_user?.mobile_number}</Typography>
                  </div>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <span>
                      <i className='ri-map-pin-line size-[14px]'></i>
                    </span>

                    <Typography
                      variant='body2'
                      className='max-w-[210px] truncate cursor-pointer'
                      title={company?.pma_user?.address || 'No Address Found'}
                    >
                      {company?.pma_user?.address
                        ? company.pma_user.address.split(' ').slice(0, 5).join(' ') +
                          (company.pma_user.address.split(' ').length > 5 ? '...' : '')
                        : 'No Address Found'}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className='flex items-start'>
                <section className='relative flex flex-col justify-between items-center w-[100%]'>
                  <section className='relative flex flex-col justify-between items-center w-[100%]'>
                    <Image src={demePfd} alt='pdf download' />
                    <section className='w-[100%] flex justify-center space-x-2.5 '>
                      <i className='ri-download-2-fill text-[#26C6F9] mt-[2px]'></i>
                      <Typography
                        variant='body1'
                        align='center'
                        className='mt-2 cursor-pointer text-[#26C6F9] hover:underline hover:underline-offset-4 flex items-center'
                      >
                        Download
                      </Typography>
                    </section>
                  </section>
                </section>
              </div>

              <section className='flex flex-col space-y-4'>
                {appointmnetStatus === 'appointment' ? (
                  <Image src={videoCalls} alt='videocalls'/>
                ) : (
                  <CustomTooltip text='Invite to Video Call' position='left' align='center'>
                    <Image
                      src={videoCalls}
                      alt='videocalls'
                      className='cursor-pointer'
                      onClick={() => handleVideoCallClick(company)}
                    />
                  </CustomTooltip>
                )}

                {appointmnetStatus === 'appointment' ? (
                  <Image src={visitLocation} alt='location'/>
                ) : (
                  <CustomTooltip text='Invite to Site Visit' position='left' align='center'>
                    <Image
                      src={visitLocation}
                      alt='location'
                      className='cursor-pointer'
                      onClick={() => handleSiteVisitclick(company)}
                    />
                  </CustomTooltip>
                )}

                {appointmnetStatus === 'appointment' ? (
                  <Image src={phoneCalls} alt='phoneCalls' />
                ) : (
                  <CustomTooltip text='Request a Call Back' position='left' align='center'>
                    <Image
                      src={phoneCalls}
                      alt='phoneCalls'
                      className='cursor-pointer'
                      onClick={() => handlecontactAgent(company?.pma_user?.id, company?.company_details?.name)}
                    />
                  </CustomTooltip>
                )}

                {appointmnetStatus === 'appointment' ? (
                  <div className='bg-[#cbf2fe] px-2 py-[10px] flex justify-center items-center rounded-md'>
                    <i className='ri-chat-4-line text-[#26C6F9]'></i>
                  </div>
                ) : (
                  <CustomTooltip text='Chat' position='left' align='center'>
                    <div
                      onClick={() => router.push(`/chats`)}
                      className='bg-[#cbf2fe] px-2 py-[10px] flex justify-center items-center rounded-md cursor-pointer'
                    >
                      <i className='ri-chat-4-line text-[#26C6F9]'></i>
                    </div>
                  </CustomTooltip>
                )}
              </section>
            </section>
          ))}
          <VideosCallsModal
            open={onlineCallsModalOpen}
            onClose={() => setOnlineCallsModalOpen(false)}
            shorlistedshortlisted_pmas={finalShortListedResponce?.data?.shortlisted_pmas}
            mainSiteVisitVideoCalls={undefined}
            defaultmultiselect={selectedPma}
            selectAllPmas={pmaIds}
            setOnlineCallsModalOpen={setOnlineCallsModalOpen}
          />
          <SiteVisitsModal
            open={siteVisitsModalOpen}
            defaultmultiselect={selectedPma}
            onClose={() => setSiteVisitsModalOpen(false)}
            types={null}
            shorlistedshortlisted_pmas={finalShortListedResponce?.data?.shortlisted_pmas}
          />
          <AppointManagemnetModal
            open={apointAgentModalOpen}
            onClose={() => setApointAgentModalOpen(false)}
            finalShortListedResponce={finalShortListedResponce}
            pmaSelectedID={shortlisted_pmaselectedID}
            InviteCompletedCalls={undefined}
            companyNames={pmaCompanyName}
          />

          <ContactModal
            onClose={() => setContactModalOpen(false)}
            open={contactModalOpen}
            pmaCompanyName={pmaCompanyName}
          />

          <ShortListAgent
            open={shortlistedModalOpen}
            onClose={() => setShortListedSuccessModalOpen(false)}
            pmaSelectedID={shortlisted_pmaselectedID}
            disabledChecks={extendedCheck}
          />
        </section>
      </div>
    </>
  )
}

export default DetailedReview
