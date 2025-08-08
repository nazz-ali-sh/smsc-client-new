'use client'

import Image from 'next/image'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CustomAvatar from '@core/components/mui/Avatar'
import CustomCircularProgress from './CustomCircularProgress'

import tendersend from '../../public/images/dashboardImages/tenderSend.svg'
import tenderResponce from '../../public/images/dashboardImages/tenderResponce.svg'
import tenderExpire from '../../public/images/dashboardImages/tenderExpire.svg'

const WeeklyReport = ({
  dashboard,
  dashboardResponce,
  progress = 10
}: {
  dashboard?: any
  dashboardResponce?: any
  progress?: number
}) => {
  console.log(dashboardResponce)
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  const tenderExpireDaat = dashboardResponce?.data?.tender_end_date?.date

  return (
    <div className='flex max-md:flex-col md:items-center gap-6 plb-5 w-full'>
      <div className='md:is-8/12 shadow-lg px-[25px] py-[32px] rounded-xl bg-white'>
        <div className='flex items-center gap-1 mbe-2'>
          <Typography variant='h2' sx={{ fontSize: '28px', fontWeight: 700, color: 'customColors.gray6' }}>
            {dashboard ? 'Welcome back' : 'Results'}
          </Typography>
          <Typography variant='h3'> 👋🏻</Typography>
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
                {dashboardResponce?.data?.pma_count} MPAs
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
              Tender
            </Typography>
            <Typography variant='body1' sx={{ fontSize: '15px', fontWeight: 400, paddingTop: '6px' }}>
              Tender Details ( Number ETC )
            </Typography>
            <Typography variant='h5' sx={{ paddingTop: '18px', fontWeight: 700 }}>
              Tender Stage
            </Typography>
          </div>
          <div className='flex items-center gap-1'>
            <div className='size-[10px] border-2 mt-2 border-red-400 bg-white rounded-full'></div>
            <Typography
              variant='body1'
              sx={{ fontSize: '15px', fontWeight: 400, paddingTop: '6px', color: 'customColors.gray7' }}
            >
              Went Live 17/5/2025
            </Typography>
          </div>
        </div>
        <div className='flex justify-center items-center mr-5'>
          <CustomCircularProgress progress={progress} size={90} strokeWidth={12} />
        </div>
      </div>
    </div>
  )
}

export default WeeklyReport
