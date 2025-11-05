'use client'

import Image from 'next/image'

import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'

import tendersend from '../../public/images/dashboardImages/tenderSend.svg'
import tenderResponce from '../../public/images/dashboardImages/thumbsUp.svg'
import tenderExpire from '../../public/images/dashboardImages/tenderExpire.svg'

interface TenderStatsProps {
  text?: string
  statsData?: any
}

const TenderStats = ({ text, statsData }: TenderStatsProps) => {
  return (
    <div className='w-full shadow-lg px-[25px] py-[32px] rounded-xl bg-white'>
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
            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Responses Sent to</Typography>
            <Typography variant='h5' sx={{ color: 'customColors.purple2', fontSize: '18px', fontWeight: 700 }}>
              {statsData?.responses_sent_to ?? 0} RMCs
            </Typography>
          </div>
        </div>

        <div className='flex gap-4'>
          <CustomAvatar variant='rounded' skin='light' size={54} color='info'>
            <Image src={tenderResponce} alt='tender Responce' />
          </CustomAvatar>
          <div>
            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>You are Shortlisted for</Typography>
            <Typography variant='h5' sx={{ color: 'customColors.cyan2', fontSize: '18px', fontWeight: 700 }}>
              {statsData?.shortlisted_for_tender ?? 0} Tenders
            </Typography>
          </div>
        </div>

        <div className='flex gap-4'>
          <CustomAvatar variant='rounded' skin='light' size={54} color='warning'>
            <Image src={tenderExpire} alt='tender Responce' />
          </CustomAvatar>
          <div>
            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Tenders Won</Typography>
            <Typography variant='h5' sx={{ color: 'customColors.orange2', fontSize: '18px', fontWeight: 700 }}>
              {statsData?.tender_won ?? 0}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenderStats
