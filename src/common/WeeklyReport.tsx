'use client'

import Image from 'next/image'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useQuery } from '@tanstack/react-query'

import { useSelector } from 'react-redux'

import CustomAvatar from '@core/components/mui/Avatar'
import CustomCircularProgress from './CustomCircularProgress'

import tendersend from '../../public/images/dashboardImages/tenderSend.svg'
import tenderResponce from '../../public/images/dashboardImages/tenderResponce.svg'
import tenderExpire from '../../public/images/dashboardImages/tenderExpire.svg'
import { dashboardData } from '@/services/dashboard-apis/dashboard-api'

interface DashboardResponse {
  dashboardResponce?: any
  data?: any
  tender_name?: any
}

const WeeklyReport = ({ text }: { text?: string }) => {
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { data: dashboardResponce, error } = useQuery<DashboardResponse, Error>({
    queryKey: ['dashboardDatas', tenderId],
    queryFn: () => dashboardData(Number(tenderId)),
    enabled: !!tenderId,
    retry: 2
  })

  if (error) {
    console.error('Dashboard data error:', error)
  }

  const tenderExpireDaat = dashboardResponce?.data?.tender_end_date?.date
  const value = dashboardResponce?.data?.tender_stage_progress?.progress_percentage

  type StageKey =
    | 'date_registered'
    | 'went_live'
    | 'result_received'
    | 'shortlisted'
    | 'video_call'
    | 'site_visit'
    | 'appointment'

  const stages = dashboardResponce?.data?.tender_stage_progress?.stages

  const currentStage: StageKey | undefined = dashboardResponce?.data?.tender_stage_progress?.current_stage?.stage

  const stageDates: Record<StageKey, string | undefined> = {
    date_registered: stages?.date_registered?.completed_at,
    went_live: stages?.went_live?.completed_at,
    result_received: stages?.result_received?.completed_at,
    shortlisted: stages?.shortlisted?.completed_at,
    video_call: stages?.video_call?.completed_at,
    site_visit: stages?.site_visit?.completed_at,
    appointment: stages?.appointment?.completed_at
  }

  const completedAtDate = (currentStage && stageDates[currentStage]) || 'No date'

  function getCurrentStageDisplayName(dashboardResponce: any): string {
    return dashboardResponce?.data?.tender_stage_progress?.current_stage?.display_name || ''
  }

  const currentStageLabel = getCurrentStageDisplayName(dashboardResponce)

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return ''
    const date = new Date(dateString)

    if (isNaN(date.getTime())) return ''
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    return `${month}-${day}-${year}`
  }

  return (
    <div className='flex max-md:flex-col md:items-center gap-6 plb-5 w-full'>
      <div className='md:is-8/12 shadow-lg px-[25px] py-[32px] rounded-xl bg-white'>
        <div className='flex items-center gap-1 mbe-2'>
          <Typography variant='h2' sx={{ fontSize: '28px', fontWeight: 700, color: 'customColors.gray6' }}>
            {text}
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: '14px' }}>Your Tender Progress so far</Typography>
        </div>

        <div className='flex flex-wrap max-md:flex-col justify-between gap-6 pt-[24px]'>
          <div className='flex gap-4'>
            <Box
              sx={{
                width: '54px',
                height: '54px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'customColors.purple1'
              }}
            >
              <Image src={tendersend} alt='tender Responce' />
            </Box>
            <div>
              <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Tender Sent to</Typography>
              <Typography variant='h5' sx={{ color: 'customColors.purple2', fontSize: '18px', fontWeight: 700 }}>
                {dashboardResponce?.data?.pma_count} PMAs
              </Typography>
            </div>
          </div>

          <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color='info'>
              <Image src={tenderResponce} alt='tender Responce' />
            </CustomAvatar>
            <div>
              <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>You have received</Typography>
              <Typography variant='h5' sx={{ color: 'customColors.cyan2', fontSize: '18px', fontWeight: 700 }}>
                {dashboardResponce?.data?.tender_response_count} Responses
              </Typography>
            </div>
          </div>

          <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color='warning'>
              <Image src={tenderExpire} alt='tender Responce' />
            </CustomAvatar>
            <div>
              <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Tender Ends on</Typography>
              <Typography variant='h5' sx={{ color: 'customColors.orange2', fontSize: '18px', fontWeight: 700 }}>
                {new Date(tenderExpireDaat)?.toLocaleDateString()}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Divider sx={{ marginY: '3px' }} orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem />

      <div className='flex justify-between md:is-4/12 shadow-lg rounded-xl py-[18px] bg-white'>
        <div className='flex flex-col justify-between gap-x-6 p-[25px]'>
          <div>
            <Typography variant='h4' sx={{ fontSize: '18px', fontWeight: 700 }}>
              Tender Id
            </Typography>
            <Typography variant='body1' sx={{ fontSize: '15px', fontWeight: 400, paddingTop: '6px' }}>
              {dashboardResponce?.tender_name}
            </Typography>
            <Typography variant='h5' sx={{ paddingTop: '18px', fontWeight: 700 }}>
              Tender Stage
            </Typography>
          </div>

          {currentStageLabel && (
            <div className='flex items-baseline gap-1'>
              <div className='size-[10px] border-2 mt-2 border-red-400 bg-white rounded-full'></div>

              <Typography
                variant='body1'
                sx={{ fontSize: '15px', fontWeight: 400, paddingTop: '6px', color: 'customColors.gray7' }}
              >
                {currentStageLabel} on {formatDate(completedAtDate)}
              </Typography>
            </div>
          )}
        </div>
        <div className='flex justify-center items-center mr-5'>
          <CustomCircularProgress progress={value} size={100} strokeWidth={12} />
        </div>
      </div>
    </div>
  )
}

export default WeeklyReport
