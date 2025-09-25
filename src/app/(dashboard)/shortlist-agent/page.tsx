'use client'

import { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Button, Card, CardContent, Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

import HorizontalLinearStepper from '@/common/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'

import DetailedReview from '../../../views/shortlistAgent/DetailedReview'

import successVisit from '../../../../public/images/customImages/sucess.svg'

import { finalShortListedAgent, getrmcshortlistStats } from '@/services/tender_result-apis/tender-result-api'
import ToolTipModal from '@/common/ToolTipModal'

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

  const rmcData = useSelector((state: any) => state?.rmcOnboarding?.rmcData)

  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState<'shortList_agent' | 'shortList_agent_info' | string>('')

  const { data: finalShortListedResponce } = useQuery<shortListedFinalAgent, Error>({
    queryKey: ['finalAgents', rmcData?.tender_id],
    queryFn: () => finalShortListedAgent(Number(rmcData?.tender_id)),
    enabled: !!rmcData?.tender_id,
    refetchOnWindowFocus: false
  })

  const { data: rmcShortlistStats } = useQuery<shortListedFinalAgent, Error>({
    queryKey: ['shortlistData', rmcData?.tender_id],
    queryFn: () => getrmcshortlistStats(Number(rmcData?.tender_id)),
    enabled: !!rmcData?.tender_id,
    refetchOnWindowFocus: false
  })

  const cardsData = [
    {
      id: 0,
      state: rmcShortlistStats?.data?.scheduled_calls,
      icons: <i className='ri-customer-service-2-line'></i>,
      descrption: 'Schedule Calls'
    },
    {
      id: 1,
      icons: <i className='ri-phone-line'></i>,
      state: rmcShortlistStats?.data?.completed_calls,
      descrption: 'Complete Calls'
    },

    {
      id: 2,
      icons: <i className='ri-map-pin-2-line'></i>,
      state: rmcShortlistStats?.data?.scheduled_visits,
      descrption: 'Schedule Visits'
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
        <WeeklyReport text='Welcome' />
      </section>
      <div className='py-5'>
        <HorizontalLinearStepper />
      </div>

      <section className='shadow-xl p-5 rounded-xl bg-white w-full'>
        <div className='flex justify-between items-center w-full'>
          <div>
            <Typography variant='h5' className='pl-6 font-bold  text-buttonPrimary'>
              SMSC Recommended Steps for Shortlisted Agents
              <Button
                onClick={() => {
                  setOpen(true)
                  setModalType('shortList_agent')
                }}
              >
                <i className='ri-information-line bg-buttonPrimary'></i>
              </Button>
            </Typography>

            <Typography variant='h2' className='pl-6 font-bold'>
              Shortlisted Agents
              <Button
                onClick={() => {
                  setOpen(true)
                  setModalType('shortList_agent_info')
                }}
              >
                <i className='ri-information-line bg-[#262B43E5]'></i>
              </Button>
            </Typography>
          </div>
          <div>
            <Button
              onClick={() => router.push('/evaluation-matrix')}
              variant='contained'
              className='bg-buttonPrimary gap-x-3'
            >
              <i className='ri-eye-line size-[22px]'></i> Evaluation Metric
            </Button>
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
                        ? 'bg-sky'
                        : index === 1
                          ? 'bg-[#e3f9d4]'
                          : index === 2
                            ? 'bg-purple1'
                            : index === 3
                              ? 'bg-[#72E12829]'
                              : ''
                    } size-[40px] justify-center rounded-lg`}
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
    </>
  )
}
