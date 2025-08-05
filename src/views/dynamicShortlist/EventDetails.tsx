'use client'

import { Card, CardContent, Divider, LinearProgress, Typography, useTheme } from '@mui/material'

import TabsSwitch from './components/Tabs'

import { tabs } from '../shortlistAgent/data'
import EditableDataTables from './components/PastActivityTable'
import useMediaQuery from '@/@menu/hooks/useMediaQuery'

const EventDetails = () => {
  const totalReviewsData: any[] = [
    { rating: 5, value: 109 },
    { rating: 4, value: 40 },
    { rating: 3, value: 18 },
    { rating: 2, value: 12 },
    { rating: 1, value: 8 }
  ]

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <section className='shadow-lg p-4 rounded-xl'>
        {/* Tabs sections */}
        <div className='flex gap-x-4 items-center'>
          {tabs.map((items, index) => (
            <div className='w-[300px]' key={index}>
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
                    <Typography className='text-[18px] font-bold leading-28'>{items.state}</Typography>
                    <Typography variant='body2' color='text.primary'>
                      {items.descrption}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/*  */}

        <section className='shadow-lg p-4 rounded-xl mt-5'>
          <section className=' flex gap-x-[24px] py-[20px] '>
            <div>
              <div className='w-[70%]'>
                <Typography variant='h5'> Rating and Reviews</Typography>
              </div>
              <section className='flex items-center gap-x-[24px]'>
                <div>
                  <i className='ri-star-s-fill bg-yellow-400 size-[80px]'></i>
                </div>
                <div>
                  <Typography className='text-[28px] font-bold text-buttonPrimary'> AVG 4.89</Typography>
                  <Typography variant='body2'> Total 187 reviews</Typography>
                  <Typography variant='body2'> All reviews are from genuine customers</Typography>
                  <Typography variant='h6'>
                    <Typography className='flex justify-end items-center text-[15px]'>
                      View more <i className='ri-arrow-right-s-line '></i>
                    </Typography>
                  </Typography>
                </div>
              </section>
            </div>

            <Divider orientation={isSmallScreen ? 'horizontal' : 'vertical'} flexItem />
            <div className='flex flex-col gap-3 is-full sm:is-6/12'>
              {totalReviewsData.map((item, index) => (
                <div key={index} className='flex items-center gap-y-[20px] gap-x-2'>
                  <Typography variant='body2' className='text-nowrap'>
                    {item.rating} Star
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={Math.floor((item.value / 185) * 100)}
                    className='w-full my-2'
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#FFFFFF',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#35C0ED'
                      }
                    }}
                  />
                  <Typography variant='body2'>{item.value}</Typography>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* tabs switch  */}
        <div className='mt-[50px]'>
          <TabsSwitch />
        </div>
        <div className='mt-[50px]'>
          <EditableDataTables />
        </div>
      </section>
    </>
  )
}

export default EventDetails
