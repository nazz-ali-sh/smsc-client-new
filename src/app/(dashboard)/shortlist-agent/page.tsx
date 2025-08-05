'use client'

import { Button, Card, CardContent, Tooltip, Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import { useQuery } from '@tanstack/react-query'

import HorizontalLinearStepper from '@/views/Dashboard/HorizontalLinearStepper'
import WeeklyReport from '@/common/WeeklyReport'

import DetailedReview from '../../../views/shortlistAgent/DetailedReview'
import { cardsData } from '../../../views/shortlistAgent/data'

import type { RootState } from '@/redux-store'
import { finalShortListedAgent } from '@/services/tender_result-apis/tender-result-api'

export default function Pages() {
  interface shortListedFinalAgent {
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

  const tender_id = useSelector((state: RootState) => state?.tenderForm?.tender_id)

  const { data: finalShortListedResponce } = useQuery<shortListedFinalAgent, Error>({
    queryKey: ['finalAgents', tender_id],
    queryFn: () => finalShortListedAgent(Number(tender_id)),
    enabled: !!tender_id,
    refetchOnWindowFocus: false
  })

  return (
    <div>
      <section className='flex w-full'>
        <WeeklyReport dashboard={[]} dashboardResponce={[]} />
      </section>
      <div className='my-[50px]'>
        <HorizontalLinearStepper />
      </div>
      
      <section className='shadow-xl p-5 rounded-xl '>
        <Typography variant='h2' className='pl-6 font-bold'>
          Shortlisted Agents
          <Tooltip
            title="Once you've shortlisted your preferred agents, we recommend starting with video calls to get an initial feel for each company. After the video calls, you can then invite the agents you'd like to meet in person to carry out a site visit.If you'd like others to join the video calls — such as fellow directors or leaseholders — you can invite them from the video call section of your portal.Don't forget: using the evaluation matrix is a great way to score each agent's suitability and keep track of your impressions throughout the process."
            placement='bottom'
          >
            <Button>
              <i className='ri-information-line'></i>
            </Button>
          </Tooltip>
        </Typography>
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
        {finalShortListedResponce && <DetailedReview finalShortListedResponce={finalShortListedResponce} />}
      </section>
    </div>
  )
}
