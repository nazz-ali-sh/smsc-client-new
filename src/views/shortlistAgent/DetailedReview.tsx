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
import ActiveBrochers from '../../../public/images/TenderResults/activeBrochers.png'

import VideosCallsModal from '@/common/VideosCallsModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import ShortListAgent from '../../common/ShortListAgent'
import ContactModal from '@/common/ContactModal'
import { rmcsendContactpma } from '@/services/tender_result-apis/tender-result-api'
import CustomButton from '@/common/CustomButton'
import CustomTooltip from '@/common/CustomTooltip'
import { calculateTimeLeft } from '@/utils/dateFormater'
import { formatWebsiteUrl } from '@/utils/urlHelpers'

const DetailedReview = ({ finalShortListedResponce }: { finalShortListedResponce: any }) => {
  const router = useRouter()
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [shortlistedModalOpen, setShortListedSuccessModalOpen] = useState(false)
  const [shortlisted_pmaselectedID, setshortlisted_pmaselectedID] = useState<number | any>()
  const [pmaCompanyName, setPmaCompanyName] = useState<string | any>('')

  const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY

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
            <section
              key={index}
              className='flex flex-col lg:flex-row justify-between items-center mt-8 shadow-md rounded-xl px-4 sm:px-6 py-4 gap-8'
            >
              <div className='flex flex-col sm:flex-row lg:flex-row justify-between items-start w-full gap-6'>
                <div className='flex flex-col items-center sm:items-start w-full sm:w-auto'>
                  <Image
                    onClick={() => router.push(`/shortlist-agent/${company?.pma_user?.id}`)}
                    src={companyImage}
                    alt={`${company.title} logo`}
                    width={180}
                    height={212}
                    className='rounded-xl cursor-pointer'
                  />

                  <div className='mt-4 text-[12px] text-buttonPrimary font-bold text-center flex justify-center'>
                    <CustomButton
                      disabled={appointmnetStatus === 'appointment'}
                      onClick={() => handkeAppointAgnet(company?.pma_user?.id, company?.company_details?.name)}
                    >
                      <Image src={whiteperson} alt='person' className='mr-[10px]' />
                      Appoint This Agent
                    </CustomButton>
                  </div>
                </div>

                <div className='flex-1 text-center sm:text-left'>
                  <Typography variant='h3' className='text-[#1F4E8D] text-[34px] font-bold pb-1'>
                    {CURRENCY}
                    {company?.fee_amount}
                  </Typography>

                  <div
                    className={`text-[22px] font-bold leading-[32px] ${
                      shortlistexpiryDate?.minutes == '0' ? 'mt-[14px]' : ''
                    }`}
                  >
                    {company?.company_details?.name}
                  </div>

                  <div
                    className={`text-[17px] font-normal leading-[32px] text-[#1F4E8D] ${
                      shortlistexpiryDate?.minutes == '0' ? 'mt-[21px]' : 'mt-[5px]'
                    }`}
                  >
                    {company?.company_details?.website ? (
                      <a
                        href={formatWebsiteUrl(company.company_details?.website)}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#1F4E8D] no-underline hover:text-[#1F4E8D]'
                      >
                        {company.company_details.website}
                      </a>
                    ) : (
                      'No website'
                    )}
                  </div>

                  <section className={`pb-4 ${shortlistexpiryDate?.minutes == '0' ? 'mt-[26px]' : 'mt-4'}`}>
                    <div className='flex flex-wrap justify-center sm:justify-start gap-2'>
                      <div
                        className={`flex items-center space-x-2 px-[15px] py-0 rounded-full ${
                          company?.video_call_booked ? 'bg-[#f1f1f1]' : 'bg-[#26C6F929]'
                        } font-semibold`}
                      >
                        <span
                          className={`w-2 h-2 ${
                            !company?.video_call_booked ? 'bg-[#26C6F9]' : 'bg-[#bbbbbb]'
                          } rounded-full pt-1`}
                        ></span>
                        <span
                          className={`${
                            !company?.video_call_booked ? 'text-[#26C6F9]' : 'text-[#bbbbbb]'
                          } font-medium text-xs`}
                        >
                          Not Contacted
                        </span>
                      </div>

                      <div
                        className={`flex items-center space-x-2 px-[15px] py-0 rounded-full ${
                          company?.video_call_booked ? 'bg-[#DDF6FE]' : 'bg-[#6969691A]'
                        } font-semibold`}
                      >
                        <span
                          className={`w-2 h-2 ${
                            company?.video_call_booked ? 'bg-[#26C6F9]' : 'bg-[#bbbbbb]'
                          } rounded-full pt-1`}
                        ></span>
                        <span
                          className={`${
                            company?.video_call_booked ? 'text-[#26C6F9]' : 'text-[#69696966]'
                          } font-medium text-xs py-1`}
                        >
                          Call Booked
                        </span>
                      </div>

                      <div
                        className={`flex items-center space-x-2 px-[15px] py-0 rounded-full ${
                          company?.site_visit_booked ? 'bg-[#DDF6FE]' : 'bg-[#6969691A]'
                        } font-semibold`}
                      >
                        <span
                          className={`w-2 h-2 ${
                            company?.site_visit_booked ? 'bg-[#26C6F9]' : 'bg-[#bbbbbb]'
                          } rounded-full pt-1`}
                        ></span>
                        <span
                          className={`${
                            company?.site_visit_booked ? 'text-[#26C6F9]' : 'text-[#69696966]'
                          } font-medium text-xs`}
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
                      {appointmnetStatus !== 'appointment' && (
                        <>
                          <div className='flex sm:flex-row gap-2 items-center justify-center sm:justify-start cursor-default'>
                            <Typography variant='h3' className='text-[#1F4E8D] text-[21px] font-bold py-1 italic'>
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

                          <div className='mt-[8px] flex justify-center sm:justify-start'>
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
                    </>
                  )}
                </div>
              </div>

              <div className='hidden lg:flex justify-between items-start w-full'>
                <div className='pl-10 pt-[50px]'>
                  <Typography variant='h4'>Contact Details</Typography>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <Image src={person} alt='person' />
                    <Typography variant='body2'>{company?.pma_user?.full_name}</Typography>
                  </div>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <i className='ri-mail-line size-[14px]'></i>
                    <Typography variant='body2'>{company?.pma_user?.email}</Typography>
                  </div>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <Image src={phone} alt='phone' className='size-[14px]' />
                    <Typography variant='body2'>{company?.pma_user?.mobile_number}</Typography>
                  </div>

                  <div className='flex items-center gap-x-[30px] mt-[20px]'>
                    <i className='ri-map-pin-line size-[14px]'></i>
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

                <div className='flex flex-col justify-between items-center'>
                  <div className='relative w-[130px] h-[180px]'>
                    <Image src={ActiveBrochers} alt='pdf download' className='w-[130px] h-[180px]' />
                  </div>

                  <div className='w-full flex justify-center space-x-2.5 mt-2'>
                    <i className='ri-download-2-fill text-[#26C6F9] mt-[2px]'></i>
                    <Typography
                      variant='body1'
                      align='center'
                      className='cursor-pointer text-[#26C6F9] hover:underline hover:underline-offset-4 flex items-center'
                    >
                      Download Brochure
                    </Typography>
                  </div>
                </div>

                <div className='flex flex-col space-y-4'>
                  {appointmnetStatus === 'appointment' ? (
                    <Image src={videoCalls} alt='videocalls' />
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
                    <Image src={visitLocation} alt='location' />
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
                      <i className='ri-chat-4-line text-[#26C6F9] shrink-0'></i>
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
                </div>
              </div>

              <div className='flex flex-col md:flex-row items-center justify-center text-center lg:hidden w-full gap-8 md:ml-[150px]'>
                <div className='flex-1 flex flex-col items-center text-center'>
                  <Typography variant='h4' className='mb-4'>
                    Contact Details
                  </Typography>

                  <div className='flex flex-col gap-4 w-full items-center'>
                    <div className='flex items-center gap-x-3 justify-center'>
                      <Image src={person} alt='person' width={20} height={20} />
                      <Typography variant='body2'>{company?.pma_user?.full_name}</Typography>
                    </div>

                    <div className='flex items-center gap-x-3 justify-center'>
                      <i className='ri-mail-line text-[20px]'></i>
                      <Typography variant='body2'>{company?.pma_user?.email}</Typography>
                    </div>

                    <div className='flex items-center gap-x-3 justify-center'>
                      <Image src={phone} alt='phone' width={20} height={20} />
                      <Typography variant='body2'>{company?.pma_user?.mobile_number}</Typography>
                    </div>

                    <div className='flex items-center gap-x-3 justify-center'>
                      <i className='ri-map-pin-line text-[20px]'></i>
                      <Typography
                        variant='body2'
                        className='truncate cursor-pointer'
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

                <div className='flex-1 flex flex-col items-center justify-center md:ml-[170px]'>
                  <div className='relative w-[130px] h-[180px]'>
                    <Image src={ActiveBrochers} alt='pdf download' className='w-[130px] h-[180px]' />
                  </div>
                  <div className='w-full flex justify-center space-x-2.5 mt-2'>
                    <i className='ri-download-2-fill text-[#26C6F9] mt-[2px]'></i>
                    <Typography
                      variant='body1'
                      align='center'
                      className='cursor-pointer text-[#26C6F9] hover:underline hover:underline-offset-4 flex items-center'
                    >
                      Download Brochure
                    </Typography>
                  </div>
                </div>

                <div className='flex flex-row md:flex-col items-center justify-center gap-4 w-full'>
                  {appointmnetStatus === 'appointment' ? (
                    <Image src={videoCalls} alt='videocalls' />
                  ) : (
                    <CustomTooltip text='Invite to Video Call' position='top' align='center'>
                      <Image
                        src={videoCalls}
                        alt='videocalls'
                        className='cursor-pointer'
                        onClick={() => handleVideoCallClick(company)}
                      />
                    </CustomTooltip>
                  )}

                  {appointmnetStatus === 'appointment' ? (
                    <Image src={visitLocation} alt='location' />
                  ) : (
                    <CustomTooltip text='Invite to Site Visit' position='top' align='center'>
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
                    <CustomTooltip text='Request a Call Back' position='top' align='center'>
                      <Image
                        src={phoneCalls}
                        alt='phoneCalls'
                        className='cursor-pointer'
                        onClick={() => handlecontactAgent(company?.pma_user?.id, company?.company_details?.name)}
                      />
                    </CustomTooltip>
                  )}
                  {appointmnetStatus === 'appointment' ? (
                    <div className='bg-[#cbf2fe] px-2 py-[10px] flex justify-center items-center rounded-md w-[48px] h-[48px]'>
                      <i className='ri-chat-4-line text-[#26C6F9] text-[20px] shrink-0'></i>
                    </div>
                  ) : (
                    <CustomTooltip text='Chat' position='top' align='center'>
                      <div
                        onClick={() => router.push(`/chats`)}
                        className='bg-[#cbf2fe] px-2 py-[10px] flex justify-center items-center rounded-md cursor-pointer w-[48px] h-[48px] mb-2'
                      >
                        <i className='ri-chat-4-line text-[#26C6F9] text-[20px] shrink-0'></i>
                      </div>
                    </CustomTooltip>
                  )}
                </div>
              </div>
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
