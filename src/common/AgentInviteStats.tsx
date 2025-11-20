import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { Typography, CardContent, Card } from '@mui/material'

import { getrmcshortlistStats } from '@/services/tender_result-apis/tender-result-api'

import successVisit from '../../public/images/customImages/sucess.svg'

interface shortListedstats {
  data?: any
}

interface AgentInviteStatsProps {
  cardWidth?: string 
}

const AgentInviteStats = ({ cardWidth }: AgentInviteStatsProps) => {
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { data: rmcShortlistStats } = useQuery<shortListedstats, Error>({
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

  const cardWidthClass = cardWidth || 'w-full sm:w-[48%] md:w-[45%] lg:w-[22%]'

  return (
    <>
      <div className='flex flex-wrap justify-between gap-4'>
        {cardsData.map((items, index) => (
          <div className={`${cardWidthClass} transition-all`} key={index}>
            <Card color={'primary'}>
              <CardContent className='flex items-center gap-4'>
                <div
                  className={`flex items-center justify-center rounded-lg size-[40px] ${  
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
    </>
  )
}

export default AgentInviteStats
