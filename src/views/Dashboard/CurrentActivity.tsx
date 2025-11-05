'use client'

import { useRouter } from 'next/navigation'

import Image from 'next/image'

import { Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import { useMutation } from '@tanstack/react-query'

import line from '../../../public/images/customImages/line.svg'
import front from '../../../public/images/dashboardImages/Front.png'
import front_1 from '../../../public/images/dashboardImages/Front-1.png'

import { downloadBlindTenderPdf } from '@/services/tender_result-apis/tender-result-api'
import { downloadFinalSeectionPDf } from '@/services/final_result_and_archeive_apis/final_results_apis'
import CustomButton from '@/common/CustomButton'
import { useDashboardData } from '@/hooks/useDashboardData'

const CurrentActivity = () => {
  const router = useRouter()

  const { data: dashboardResponce } = useDashboardData()

  const stages = dashboardResponce?.data?.tender_stage_progress?.current_stage?.stage

  const allowedStages = ['result_received', 'shortlisted', 'video_call', 'site_visit', 'appointment']

  const isClickable = allowedStages.includes(stages ?? '')

  const headingStyle = {
    fontSize: '30px',
    color: 'customColors.darkGray1',
    paddingTop: '8px',
    paddingX: '22px',
    fontWeight: 500
  }

  const tender_id = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const downloadMutation = useMutation({
    mutationFn: (id: number) => downloadBlindTenderPdf(id),
    onSuccess: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `tender_${tender_id}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Download failed:', error)
    }
  })

  const downloadFinalSelectionMutation = useMutation({
    mutationFn: (id: number) => downloadFinalSeectionPDf(id),
    onSuccess: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = `tender_${tender_id}.pdf`
      link.click()

      window.URL.revokeObjectURL(url)
    },
    onError: error => {
      console.error('Download failed:', error)
    }
  })

  return (
    <>
      <div className='bg-white p-4 md:p-8 shadow-xl  rounded-lg '>
        <div className=''>
          <div className='flex items-start justify-between pt-3'>
            <div className=' w-[50%]'>
              <Typography className='w-[50%] text-[20px] font-semibold' sx={headingStyle}>
                Current Activity
              </Typography>
              <div className='flex gap-x-[70px] items-center mt-[30px] '>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 px-[20px] py-[20px] w-[259px] h-[145px]'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-4'>
                      <div className=' bg-sky p-2 flex items-center rounded-lg'>
                        <i className='ri-customer-service-2-line bg-buttonPrimary'></i>
                      </div>
                      <div>
                        <div className=' font-bold text-gray-900 text-[15px]'>
                          {dashboardResponce?.data?.schedule_calls || '0'}
                        </div>
                        <div className='text-textGray text-[14px]'>Scheduled Calls</div>
                      </div>
                    </div>
                  </div>
                  <section className='flex justify-end items-end mt-5 mb-2 mr-2'>
                    <CustomButton
                      disabled={dashboardResponce?.data?.schedule_calls === 0 || !tender_id}
                      onClick={() => router.push('/video-calls')}
                      variant='contained'
                    >
                      View List <i className='ri-arrow-right-line bg-white ml-1 size-[12px]'></i>
                    </CustomButton>
                  </section>
                </div>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5 w-[259px] h-[145px]'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center justify-center space-x-4'>
                      <div className='bg-[#E6E7FF] p-2 flex items-center rounded-lg'>
                        <i className='ri-user-3-line bg-[#666CFF]'></i>
                      </div>
                      <div>
                        <div className='text-[15px] font-bold text-gray-900'>
                          {dashboardResponce?.data?.shortlisted_pma || '0'}
                        </div>
                        <div className='text-[14px] text-textGray '>Shortlisted Agents</div>
                      </div>
                    </div>
                  </div>
                  <section className='flex justify-end items-end mt-5 mb-2 mr-2'>
                    <CustomButton
                      disabled={dashboardResponce?.data?.shortlisted_pma === 0 || !tender_id}
                      onClick={() => router.push('/shortlist-agent')}
                      variant='contained'
                    >
                      View List <i className='ri-arrow-right-line bg-white ml-1 size-[12px]'></i>
                    </CustomButton>
                  </section>
                </div>
              </div>
            </div>

            <section className='w-[50%]'>
              <div className='flex items-start gap-8'>
                <div className='flex items-start pt-8'>
                  <Image src={line} alt='horizontal line' height={260} />
                </div>

                <div className='w-[100%] relative flex items-start justify-between gap-y-8 pl-16'>
                  <section className='relative flex flex-col justify-between items-start w-[100%]  '>
                    <p className='text-[20px] font-semibold mb-2'>Blind Report</p>
                    <Image src={front} alt='pdf download' className='w-[170px] max-h-[230px] shadow-md' />
                    <section className='w-[100%]'>
                      <Typography
                        variant='body1'
                        align='left'
                        className={`mt-4 text-[#696969] ${'cursor-pointer hover:underline hover:underline-offset-4'}`}
                        onClick={() => {
                          downloadMutation.mutate(tender_id)
                        }}
                      >
                        {isClickable ? ' Download Blind Tender Report' : ''}
                      </Typography>

                      <Typography
                        variant='body1'
                        align='left'
                        className='mt-4 cursor-pointer text-[#696969] hover:underline hover:underline-offset-4 '
                      >
                        {isClickable ? '' : 'Unlocks After Tender Closes'}
                      </Typography>
                    </section>
                  </section>

                  <section className='relative flex flex-col justify-between items-start w-[100%]'>
                    <p className='text-[20px] font-semibold mb-2'>Final Report</p>
                    <Image src={front_1} alt='pdf download' className='w-[170px] max-h-[230px] shadow-md' />
                    <section className='w-[100%]'>
                      <Typography
                        variant='body1'
                        align='left'
                        className='mt-4 cursor-pointer text-[#696969] hover:underline hover:underline-offset-4'
                        onClick={() => downloadFinalSelectionMutation.mutate(tender_id)}
                      >
                        {stages == 'appointment' ? 'Download Full Journey Report' : ''}
                      </Typography>
                      <Typography
                        variant='body1'
                        align='left'
                        className='mt-4 cursor-pointer text-[#696969] hover:underline hover:underline-offset-4 '
                      >
                        {stages == 'appointment' ? '' : ' Unlocks After Appointing Your New Managing Agent'}
                      </Typography>
                    </section>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default CurrentActivity
