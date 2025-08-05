'use client'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lighten, darken, useTheme } from '@mui/material/styles'

import type { ApexOptions } from 'apexcharts'

import tendersend from '../../public/images/dashboardImages/tenderSend.svg'
import tenderResponce from '../../public/images/dashboardImages/tenderResponce.svg'
import tenderExpire from '../../public/images/dashboardImages/tenderExpireDate.svg'

import CustomAvatar from '@core/components/mui/Avatar'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const WeeklyReport = ({ dashboard, dashboardResponce }: { dashboard?: any; dashboardResponce?: any }) => {
  console.log(dashboardResponce)
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {
        left: 20,
        right: 20
      }
    },
    colors: [
      darken(theme.palette.success.main, 0.15),
      darken(theme.palette.success.main, 0.1),
      'var(--mui-palette-success-main)',
      lighten(theme.palette.success.main, 0.2),
      lighten(theme.palette.success.main, 0.4),
      lighten(theme.palette.success.main, 0.6)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['36h', '56h', '16h', '32h', '56h', '16h'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 20,
              fontSize: '0.875rem'
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '1.125rem',
              formatter: value => `${value}%`,
              color: 'var(--mui-palette-text-primary)'
            },
            total: {
              show: true,
              fontSize: '0.8125rem',
              label: 'Total',
              color: 'var(--mui-palette-text-disabled)',
              formatter: () => '231h'
            }
          }
        }
      }
    }
  }

  const tenderExpireDaat = dashboardResponce?.data?.tender_end_date?.date

  return (
    <div className='flex max-md:flex-col md:items-center gap-6 plb-5 w-full '>
      <div className='md:is-8/12 shadow-lg px-[25px] py-[32px] rounded-xl bg-white'>
        <div className='flex items-center gap-1 mbe-2'>
          <Typography variant='h2' className='font-bold'>
            {dashboard ? 'Welcome back' : 'Results'}
          </Typography>
          <Typography variant='h3'> 👋🏻</Typography>
        </div>
        <div className='mbe-4'>
          <Typography>Your Tender Progress so far</Typography>
        </div>

        <div className='flex flex-wrap max-md:flex-col justify-between gap-6'>
          <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color='primary'>
              <Image src={tendersend} alt='tender Responce' />
            </CustomAvatar>
            <div>
              <Typography className='font-medium'>Tender Sent to</Typography>
              <Typography variant='h5'>{dashboardResponce?.data?.pma_count} MPAs</Typography>
            </div>
          </div>

          <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color='info'>
              <Image src={tenderResponce} alt='tender Responce' />
            </CustomAvatar>
            <div>
              <Typography className='font-medium'>You have received</Typography>
              <Typography variant='h5'>{dashboardResponce?.data?.tender_response_count} Responses</Typography>
            </div>
          </div>

          <div className='flex gap-4'>
            <CustomAvatar variant='rounded' skin='light' size={54} color='warning'>
              <Image src={tenderExpire} alt='tender Responce' />
            </CustomAvatar>
            <div>
              <Typography className='font-medium'>Tender Ends on</Typography>
              <Typography variant='h5'>{new Date(tenderExpireDaat)?.toLocaleDateString()}</Typography>
            </div>
          </div>
        </div>
      </div>
      <Divider orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem />

      <div className='flex justify-between md:is-4/12 shadow-lg rounded-xl py-[28px] bg-white'>
        <div className='flex flex-col justify-between gap-x-6 p-[25px] '>
          <div>
            <Typography variant='h4' className='mbe-1'>
              Tender
            </Typography>
            <Typography variant='body1' className='mbe-1'>
              Tender Details ( Number ETC )
            </Typography>
            <Typography variant='h5'>Tender Stage</Typography>
          </div>
          <div>
            <Typography variant='body1' className=''>
              ⭕ Went Live 17/5/2025
            </Typography>
          </div>
        </div>
        <div className='mt-[40px]'>
          <AppReactApexCharts
            type='donut'
            height={189}
            width={150}
            options={options}
            series={[23, 35, 10, 20, 35, 23]}
          />
        </div>
      </div>
    </div>
  )
}

export default WeeklyReport
