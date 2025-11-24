'use client'

import { Grid, Card, Typography, Divider, Box } from '@mui/material'

import { usePmadsahbaordData } from '@/hooks/usePmadsahbaordData'

interface TenderStatusCardData {
  title: string
  icon: string
  today_count?: number | string
  total_count?: number | string
  description?: string
  due_payment?: string | number
  overdue_payment?: string | number
}

const TenderStatusCards = () => {
  const { data: dashboardData, isLoading } = usePmadsahbaordData()

  const tenderData = dashboardData?.data
    ? {
        live_tenders: {
          title: 'Live Tenders',
          icon: 'ri-mail-line',
          today_count: `+${dashboardData.data.stages.live_tenders.today_count} Today`,
          total_count: dashboardData.data.stages.live_tenders.total_count,
          description: 'Tenders Currently Open'
        },
        submitted_tenders: {
          title: 'Submitted Tenders',
          icon: 'ri-check-double-line',
          today_count: `+${dashboardData.data.stages.submitted_tenders.today_count} Submitted`,
          total_count: dashboardData.data.stages.submitted_tenders.total_count,
          description: 'Applied but not shortlisted yet.'
        },
        shortlisted_tenders: {
          title: 'Shortlisted Tenders',
          icon: 'ri-thumb-up-line',
          today_count: `+${dashboardData.data.stages.shortlisted_tenders.today_count} Shortlisted`,
          total_count: dashboardData.data.stages.shortlisted_tenders.total_count,
          description: 'Active shortlist (Includes date of shortlisting)'
        },
        video_call: {
          title: 'Video Call',
          icon: 'ri-video-add-line',
          today_count: `${dashboardData.data.stages.video_calls.today_count} Calls Today`,
          total_count: dashboardData.data.stages.video_calls.total_count,
          description: 'You have been invited to a video call for these tenders.'
        },
        site_visit: {
          title: 'Site Visit',
          icon: 'ri-user-location-line',
          today_count: `${dashboardData.data.stages.site_visits.today_count} Visits Today`,
          total_count: dashboardData.data.stages.site_visits.total_count,
          description: 'You have been invited to a site visit for these tenders.'
        },
        appointed: {
          title: 'Appointed',
          icon: 'ri-check-line',
          today_count: `${dashboardData.data.stages.appointed.today_count} Appointed Today`,
          total_count: dashboardData.data.stages.appointed.total_count,
          description: 'Congratulations! You have been appointed for these tenders.'
        },
        closed_tenders: {
          title: 'Closed Tenders',
          icon: 'ri-close-line',
          today_count: `+${dashboardData.data.stages.closed.today_count} Expired Today`,
          total_count: dashboardData.data.stages.closed.total_count,
          description: 'Tenders have concluded and your proposal was not selected.'
        },
        not_appointed: {
          title: 'Payments',
          icon: 'ri-money-pound-box-line',
          today_count: `+${dashboardData.data.stages.payments.today_count || 0} Today`,
          total_count: dashboardData.data.stages.payments.total_count || 0,
          description: '',
          due_payment: dashboardData.data.stages.payments.due_payments || 0,
          overdue_payment: dashboardData.data.stages.payments.overdue_payments || 0
        }
      }
    : {}

  if (isLoading) {
    return (
      <Grid container spacing={6} sx={{ marginTop: 2 }}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card elevation={2} sx={{ borderRadius: '10px', height: '100%', position: 'relative' }}>
              <Box sx={{ padding: 3 }}>
                <div className='animate-pulse'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                  <div className='h-6 bg-gray-200 rounded w-1/2 mb-4'></div>
                  <div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded w-2/3'></div>
                </div>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={6} sx={{ marginTop: 2 }}>
      {Object.entries(tenderData).map(([key, cardData]) => {
        const card = cardData as TenderStatusCardData

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Card elevation={2} sx={{ borderRadius: '10px', height: '100%', position: 'relative' }}>
              <Box sx={{ padding: 3 }}>
                <div className='flex justify-between items-center'>
                  <div
                    className='p-2 rounded-full flex items-center justify-center size-[44px]'
                    style={{ backgroundColor: '#c4edfa' }}
                  >
                    <i style={{ color: '#35C0ED' }} className={`${card.icon} text-[24px]`} />
                  </div>
                  <p className='text-xs leading-4 text-[#34C759] font-semibold'>{card?.today_count}</p>
                </div>

                <Typography
                  sx={{
                    fontSize: '24px',
                    color: '#3B4055',
                    paddingTop: '12px',
                    fontWeight: 500,
                    lineHeight: '36px'
                  }}
                >
                  {card.title}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#696969',
                    paddingTop: '15px',
                    fontWeight: 400,
                    lineHeight: '36px'
                  }}
                >
                  {card.description}
                </Typography>
                {key === 'not_appointed' && (
                  <>
                    <div className='flex gap-2 items-center'>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#696969',
                          paddingTop: '15px',
                          fontWeight: 400,
                          lineHeight: '36px'
                        }}
                      >
                        Due Payments:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#696969',
                          paddingTop: '15px',
                          fontWeight: 700,
                          lineHeight: '36px'
                        }}
                      >
                        {card.due_payment}
                      </Typography>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#696969',

                          fontWeight: 400,
                          lineHeight: '36px'
                        }}
                      >
                        Overdue Payments:
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#696969',
                          fontWeight: 700,
                          lineHeight: '36px'
                        }}
                      >
                        {card.overdue_payment}
                      </Typography>
                    </div>
                  </>
                )}
                <Box sx={{ minHeight: '80px', paddingBottom: '50px' }}></Box>

                <div className='absolute bottom-4 right-4 left-4 flex items-center justify-between'>
                  <p className='text-[#696969] font-bold text-2xl leading-6'>{card.total_count}</p>
                  <div className='w-8 h-8 rounded-md flex justify-center items-center bg-[#E0F2FE] cursor-pointer hover:bg-[#BAE6FD]'>
                    <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                  </div>
                </div>
              </Box>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default TenderStatusCards
