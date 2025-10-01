'use client'

import { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Card, CardContent, Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'

import DetailedReview from '../../../views/shortlistAgent/DetailedReview'

import successVisit from '../../../../public/images/customImages/sucess.svg'

import { finalShortListedAgent, getrmcshortlistStats } from '@/services/tender_result-apis/tender-result-api'
import ToolTipModal from '@/common/ToolTipModal'
import CustomLoader from '@/common/CustomLoader'
import CustomButton from '@/common/CustomButton'

export default function Pages() {
  const router = useRouter()

  interface shortListedFinalAgent {
    data: any
    shortlist_id: number
    tender_id?: number
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

  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState<'shortList_agent' | 'shortList_agent_info' | string>('')

  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { data: finalShortListedResponce, isLoading } = useQuery<shortListedFinalAgent, Error>({
    queryKey: ['finalAgents', tenderId],
    queryFn: () => finalShortListedAgent(Number(tenderId)),
    enabled: !!tenderId,
    refetchOnWindowFocus: false
  })

  const { data: rmcShortlistStats } = useQuery<shortListedFinalAgent, Error>({
    queryKey: ['shortlistData', tenderId],
    queryFn: () => getrmcshortlistStats(Number(tenderId)),
    enabled: !!tenderId,
    refetchOnWindowFocus: false
  })

  const cardsData = [
    {
      id: 0,
      state: rmcShortlistStats?.data?.scheduled_calls,
      icons: <i className='ri-customer-service-2-line'></i>,
      descrption: 'Scheduled Calls'
    },
    {
      id: 1,
      icons: <i className='ri-phone-line'></i>,
      state: rmcShortlistStats?.data?.completed_calls,
      descrption: 'Completed Calls'
    },

    {
      id: 2,
      icons: <i className='ri-map-pin-2-line'></i>,
      state: rmcShortlistStats?.data?.scheduled_visits,
      descrption: 'Scheduled Visits'
    },

    {
      id: 3,
      icons: <Image src={successVisit} alt='success Visit' />,
      state: rmcShortlistStats?.data?.successful_visits,
      descrption: 'Successful visits'
    }
  ]

  return (
    <>
      <section className='flex w-full'>
        <WeeklyReport text='Shorlisted Agents' />
      </section>
      <div className='py-5'>
        <HorizontalLinearStepper />
      </div>
      {isLoading ? (
        <CustomLoader size='large' />
      ) : (
        <section className='shadow-xl p-5 rounded-xl bg-white w-full'>
          <div className='flex justify-between items-center w-full'>
            <div>
              <div className='flex gap-2 items-center'>
                <Typography variant='h5' className='pl-6 font-bold  text-buttonPrimary'>
                  SMSC Recommended Steps for Shortlisted Agents
                </Typography>
                <span
                  className='cursor-pointer pl-1 pt-2'
                  onClick={() => {
                    setOpen(true)
                    setModalType('shortList_agent')
                  }}
                >
                  <i className='ri-information-line bg-buttonPrimary'></i>
                </span>
              </div>

              <div className='flex gap-2 items-center'>
                <Typography variant='h2' className='pl-6 font-bold'>
                  Shortlisted Agents
                </Typography>
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    setOpen(true)
                    setModalType('shortList_agent_info')
                  }}
                >
                  <i className='ri-information-line bg-[#262B43E5]'></i>
                </span>
              </div>
            </div>
            <div>
              <CustomButton
                onClick={() => router.push('/evaluation-matrix')}
                variant='contained'
                startIcon={<i className='ri-edit-box-line size-[22px]'></i>}
              >
                Evaluation Metric
              </CustomButton>
            </div>
          </div>

          <ToolTipModal open={open} onClose={() => setOpen(false)} type={modalType} />

          <ul>
            <li className='text-[16px] font-normal leading-6'>
              Schedule video calls with the managing agents you&apos;ve shortlisted.
            </li>
            <li className='text-[16px] font-normal leading-6'>
              Click Schedule Call to book a time or request a callback.
            </li>
            <li className='text-[16px] font-normal leading-6'>
              To invite others, use the video call section of your portal.
            </li>
            <li className='text-[16px] font-normal leading-6'>
              Your contact details remain private for the first 3 days. This gives you time to review agent profiles and
              do your research.
            </li>
            <li className='text-[16px] font-normal leading-6'>
              If you book a meeting or request a call, your contact details will be shared with that agent immediately.
            </li>
          </ul>
          <div className='flex justify-between items-center'>
            {cardsData.map((items, index) => (
              <div className='w-[22%]' key={index}>
                <Card color={'primary'}>
                  <CardContent className='flex items-center gap-x-[16px]'>
                    <div
                      className={`flex items-center gap-4 ${
                        index === 0
                          ? 'bg-[#CBEFFB]'
                          : index === 1
                            ? 'bg-[#E3F9D4]'
                            : index === 2
                              ? 'bg-[#3B72ED29]'
                              : index === 3
                                ? 'bg-[#0B295229]'
                                : ''
                      } size-[40px] justify-center rounded-lg`}
                      style={{
                        color:
                          index === 0
                            ? '#35C0ED'
                            : index === 1
                              ? '#72E128'
                              : index === 2
                                ? '#3B72ED'
                                : index === 3
                                  ? '#0B2952'
                                  : 'inherit',
                        filter:
                          index === 3
                            ? 'brightness(0) saturate(100%) invert(12%) sepia(94%) saturate(7491%) hue-rotate(210deg) brightness(15%) contrast(100%)'
                            : 'none'
                      }}
                    >
                      {items.icons}
                    </div>
                    <div className='flex flex-col'>
                      <Typography className='text-[17px] font-bold leading-28'>{items.state}</Typography>
                      <Typography variant='body1' color='text.primary'>
                        {items.descrption}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {finalShortListedResponce ? (
            <DetailedReview finalShortListedResponce={finalShortListedResponce} />
          ) : (
            'Data Not Found'
          )}
        </section>
      )}
    </>
  )
}
