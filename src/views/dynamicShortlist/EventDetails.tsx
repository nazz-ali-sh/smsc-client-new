'use client'

import { Card, CardContent, Divider, LinearProgress, Typography, useTheme } from '@mui/material'

import TabsSwitch from './components/Tabs'

import { tabs } from '../shortlistAgent/data'
import EditableDataTables from './components/PastActivityTable'
import useMediaQuery from '@/@menu/hooks/useMediaQuery'

import type { PmaDetailsResponse } from './type'

interface EventDetailsProps {
  userData: PmaDetailsResponse
  handleDataFromSubChild: any
}

const EventDetails = ({ userData, handleDataFromSubChild }: EventDetailsProps) => {
  const starRatings = [
    { label: '5 Star', count: userData?.data?.ratings_and_reviews?.five_star_count },
    { label: '4 Star', count: userData?.data?.ratings_and_reviews?.four_star_count },
    { label: '3 Star', count: userData?.data?.ratings_and_reviews?.three_star_count },
    { label: '2 Star', count: userData?.data?.ratings_and_reviews?.two_star_count },
    { label: '1 Star', count: userData?.data?.ratings_and_reviews?.one_star_count }
  ]

  console.log(userData)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  function handleDataFromChild(dataFromChild: any) {
    handleDataFromSubChild(dataFromChild)
  }

  return (
    <>
      <section className='shadow-lg p-4 rounded-xl'>
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
                  <Typography variant='body2'>
                    Total {userData?.data?.ratings_and_reviews?.google_review_count} reviews
                  </Typography>
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

            <section className='flex flex-col gap-3 is-full sm:is-6/12'>
              {starRatings.map((rating, index) => (
                <div key={index}>
                  <div className='flex items-center gap-y-[20px] gap-x-2'>
                    <Typography variant='body2' className='text-nowrap'>
                      {rating.label}
                    </Typography>
                    <LinearProgress
                      variant='determinate'
                      value={(rating.count / userData?.data?.ratings_and_reviews?.google_review_count) * 100}
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
                  </div>
                </div>
              ))}
            </section>
          </section>
        </section>

        <div className='mt-[50px]'>
          <TabsSwitch sendDataToParent={handleDataFromChild} data={userData} />
        </div>
        <div className='mt-[50px]'>
          <EditableDataTables />
        </div>
      </section>
    </>
  )
}

export default EventDetails
