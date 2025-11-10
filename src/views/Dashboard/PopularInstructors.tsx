'use client'
import { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@mui/material'

import { useSelector } from 'react-redux'

import phone from '../../../public/images/dashboardImages/phone.svg'
import phonewhite from '../../../public/images/dashboardImages/phoneWhiteIcon.svg'
import personWhiteIcon from '../../../public/images/dashboardImages/personWhiteIcon.svg'
import roundStar from '../../../public/images/dashboardImages/roundStar.svg'
import personTodo from '../../../public/images/dashboardImages/persontodo.svg'
import star from '../../../public/images/dashboardImages/star.svg'
import CustomTooltip from '../../common/CustomTooltip'
import VideosCallsModal from '@/common/VideosCallsModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'
import CommonModal from '@/common/CommonModal'
import CustomButton from '@/common/CustomButton'
import { formatDates, getDaysPassed } from '@/utils/dateFormater'
import { getLeaseholderTypeLabel } from '@/constants'
import DashboardSkeletonGrid from '@/components/DashboardSkeletonGrid'
import { useShortlistedPmas } from '@/hooks/useShortlistedPmasData'
import { useDashboardData } from '@/hooks/useDashboardData'

const TenderCards = () => {
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)
  const [openPmaDropdown, setOpenPmaDropdown] = useState(false)
  const [pmaValue, setpmaValue] = useState('')
  const [selectedPmaName, setSelectedPmaName] = useState('')
  const { data: dashboardResponce, isLoading } = useDashboardData()

  const [error, setError] = useState(false)

  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const handleChange = (event: any) => {
    const newValue = event.target.value

    setpmaValue(newValue)
    setError(newValue === '')

    const selectedPma = finalShortListedResponce?.data?.shortlisted_pma_users?.find(
      (item: PmaUser) => String(item.id) === String(newValue)
    )

    if (selectedPma) {
      setSelectedPmaName(selectedPma.full_name)
    }
  }

  const stages = dashboardResponce?.data?.tender_stage_progress?.stages

  const router = useRouter()

  interface PmaUser {
    id: number
    full_name: string
  }

  const { data: finalShortListedResponce } = useShortlistedPmas()

  const handleAppointAgentSelection = () => {
    setApointAgentModalOpen(true)
    setOpenPmaDropdown(false)
  }

  const sinceLastVideoCall = dashboardResponce?.data?.days_since_last_video_call
  const CallCurrentStage = stages?.video_call?.is_completed

  const sinceLastSiteVisit = dashboardResponce?.data?.days_since_last_site_visit
  const siteVistCurrentStage = stages?.site_visit?.is_completed

  const shortlistedCurrentStage = stages?.shortlisted?.is_completed
  const sinceLastshortlisted = dashboardResponce?.data?.days_since_last_shorlisted

  const shortlistedCompletedAtDate = stages?.shortlisted?.completed_at
  const daysSinceShortlist = getDaysPassed(shortlistedCompletedAtDate)

  if (isLoading) {
    return <DashboardSkeletonGrid />
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370px' }} className=' relative'>
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i style={{ color: '#35c0ed' }} className='ri-eye-2-line size-[24px]' />
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: stages?.went_live?.is_completed || tenderId ? 'customColors.darkGray1' : '#919191E5',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Tender Overview
            </Typography>

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Tender overview not Available
              </Typography>
            ) : (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: stages?.went_live?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                View information of your tender
              </Typography>
            )}

            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Tender details will be available once it goes live.
              </Typography>
            ) : stages?.went_live?.is_completed && stages?.went_live?.details ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px'
                  }}
                >
                  Reference Number: {dashboardResponce?.tender_name}
                </Typography>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  Block Name: {getLeaseholderTypeLabel(stages?.went_live?.details?.tender_type)}
                </Typography>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  Submitted On: {formatDates(stages?.went_live?.details?.tender_creation_date)}
                </Typography>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  Tender ends on: {formatDates(dashboardResponce?.data?.tender_end_date?.date)}
                </Typography>
              </CardContent>
            ) : (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px'
                  }}
                >
                  Tender details will be available once it goes live.
                </Typography>
              </CardContent>
            )}

            <Box
              onClick={!stages?.went_live?.is_completed ? undefined : () => router.push('/tender-information')}
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '30px', marginTop: '75px' }}
              className=' absolute bottom-[18px] right-2'
            >
              <CustomTooltip text='View Tender Details' position='left' align='left'>
                <Box
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '6px'
                  }}
                >
                  <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{ borderRadius: 1, height: '370PX', boxShadow: stages?.result_received?.is_completed ? '' : 'none' }}
            className=' relative'
          >
            <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i
                className={`ri-database-line size-[24px] ${stages?.result_received?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
              />
            </div>

            <Typography
              sx={{
                fontSize: '30px',
                color: stages?.result_received?.is_completed
                  ? 'customColors.darkGray1'
                  : !tenderId
                    ? '#919191E5'
                    : '#919191E5',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Tender Results
            </Typography>

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Tender Results Not Available
              </Typography>
            ) : (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color:
                    stages?.result_received?.is_completed == true
                      ? 'customColors.green5'
                      : stages?.result_received?.is_completed == false
                        ? 'ustomColors.textGray'
                        : 'customColors.textGray',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Your tender was sent to {stages?.result_received?.details?.pma_count} PMAs. You have received{' '}
                {stages?.result_received?.details?.total_response_count} responses
              </Typography>
            )}

            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Please launch a tender to initiate the process.
              </Typography>
            ) : stages?.result_received?.is_completed === true ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px'
                  }}
                >
                  Tender ended on : {formatDates(stages?.result_received?.details?.tender_end_date)}
                </Typography>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  Results received on : {formatDates(stages?.result_received?.details?.tender_response_date)}
                </Typography>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  Tender sent to : {stages?.result_received?.details?.pma_count} PMAs
                </Typography>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  Total results received : {stages?.result_received?.details?.total_response_count} PMAs
                </Typography>
              </CardContent>
            ) : (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: stages?.result_received?.is_completed ? 'customColors.textGray' : '#919191E5',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    paddingTop: '2px'
                  }}
                >
                  You’ll be able to review all proposals anonymously as agents have submitted their responses.
                </Typography>
              </CardContent>
            )}
            <Box
              onClick={!stages?.result_received?.is_completed ? undefined : () => router.push('/tender-result')}
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}
              className=' absolute bottom-[18px] right-2'
            >
              <CustomTooltip text='View Tender Results' position='left' align='left'>
                <Box
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '6px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px]  ${stages?.result_received?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        {/* shortlsited */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{ borderRadius: 1, height: '370PX', boxShadow: stages?.shortlisted?.is_completed ? '' : 'none' }}
            className=' relative'
          >
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i
                className={`ri-list-check-2 size-[24px] ${stages?.shortlisted?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
              />
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: stages?.shortlisted?.is_completed
                  ? 'customColors.darkGray1'
                  : tenderId
                    ? '#919191E5'
                    : '#919191E5',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Shortlisted
            </Typography>

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Tender Results Not Available
              </Typography>
            ) : (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: stages?.shortlisted?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                {stages?.shortlisted?.is_completed
                  ? `You’ve shortlisted ${dashboardResponce?.data?.shortlisted_pma} agents.`
                  : 'No shortlisted agents yet'}
              </Typography>
            )}

            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Please launch a tender first. The shortlisting process begins after tender submission closes.
              </Typography>
            ) : !shortlistedCurrentStage && sinceLastshortlisted === 0 ? (
              <Typography
                sx={{
                  color: stages?.shortlisted?.is_completed ? 'customColors.textGray' : '#919191E5',
                  fontSize: '13px',
                  fontWeight: 400,
                  paddingX: '22px',
                  marginTop: '14px'
                }}
              >
                Shortlist your preferred agents from the Results tab to unlock this section.
              </Typography>
            ) : shortlistedCurrentStage && sinceLastshortlisted === 0 ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    paddingX: '8px',
                    marginTop: '14px'
                  }}
                >
                  View Company Information On The Managing Agents You Have Shortlisted
                </Typography>
              </CardContent>
            ) : !shortlistedCurrentStage && Number(sinceLastshortlisted) >= 1 ? (
              <Typography
                sx={{
                  color: 'red',
                  fontSize: '13px',
                  fontWeight: 400,
                  marginTop: '15px',
                  paddingX: '24px'
                }}
              >
                You’ve had your results for {sinceLastshortlisted} days — shortlist now to move forward.
              </Typography>
            ) : (
              ''
            )}

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}
              className=' absolute bottom-[18px] right-2'
            >
              <CustomTooltip text='View Shortlisted Agents ' position='left' align='left'>
                <Box
                  onClick={!stages?.shortlisted?.is_completed ? undefined : () => router.push('/shortlist-agent')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '6px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px]  ${stages?.shortlisted?.is_completed ? ' text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>

              <CustomTooltip
                text={
                  stages?.shortlisted?.is_completed
                    ? "You've appointed your agent. No further actions can be taken on this tender."
                    : 'Shortlist Agents'
                }
                position='left'
                align='left'
              >
                <Box
                  onClick={stages?.shortlisted?.is_completed ? undefined : () => router.push('/tender-result')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: stages?.shortlisted?.is_completed ? '#26C6F93D' : 'customColors.cyan3',
                    marginX: '6px',
                    cursor: stages?.shortlisted?.is_completed ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Image
                    src={
                      stages?.shortlisted?.is_completed
                        ? personWhiteIcon
                        : stages?.shortlisted?.is_current
                          ? personTodo
                          : personWhiteIcon
                    }
                    alt='shortlist icon'
                    className='w-[14px] h-[14px]'
                  />
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        {/*  Vidoe call*/}

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{ borderRadius: 1, height: '370PX', boxShadow: stages?.video_call?.is_current ? '' : 'none' }}
            className=' relative'
          >
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <Image src={stages?.video_call?.is_current ? phone : phonewhite} alt='phone-image' />
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: stages?.video_call?.is_current ? 'customColors.darkGray1' : tenderId ? '#919191E5' : '#919191E5',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Video Calls
            </Typography>

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Video Calls Can Not Be Scheduled.
              </Typography>
            ) : !CallCurrentStage && sinceLastVideoCall === 0 ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: 'customColors.textGray',
                  fontSize: '12px',
                  paddingX: '24px',
                  fontWeight: 300
                }}
              >
                Shortlist Agent to unlock this section
              </Typography>
            ) : CallCurrentStage && sinceLastVideoCall === 0 ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: stages?.video_call?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                  fontSize: '12px',
                  paddingX: '24px',
                  fontWeight: 300
                }}
              >
                You’ve invited {dashboardResponce?.data?.schedule_calls} agents to video calls.
              </Typography>
            ) : !CallCurrentStage && Number(sinceLastVideoCall) >= 1 ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: 'customColors.green5',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                No video calls booked yet.
              </Typography>
            ) : (
              ''
            )}

            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                You must launch a tender first. Video calls are scheduled with shortlisted candidates only after the
                initial review is complete
              </Typography>
            ) : !CallCurrentStage && sinceLastVideoCall === 0 ? (
              <Typography
                sx={{
                  color: stages?.video_call?.is_current ? 'customColors' : '#919191E5',
                  fontSize: '13px',
                  fontWeight: 400,
                  paddingX: '22px',
                  marginTop: '14px'
                }}
              >
                You’ll be able to invite agents to site visits once you have shortlisted from your results.
              </Typography>
            ) : CallCurrentStage && sinceLastVideoCall === 0 ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    paddingX: '1px',
                    marginTop: '14px'
                  }}
                >
                  Next Scheduled Call : {formatDates(stages?.video_call?.details?.upcoming?.date) || ''}{' '}
                  {stages?.video_call?.details?.upcoming?.slot && <>({stages?.video_call?.details?.upcoming?.slot})</>}
                </Typography>

                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    paddingX: '1px',
                    marginTop: '14px'
                  }}
                >
                  {stages?.video_call?.details?.completed?.date && (
                    <>
                      Last Completed Call : {formatDates(stages?.video_call?.details?.completed?.date) || ''}{' '}
                      {stages?.video_call?.details?.completed?.slot && (
                        <>({stages?.video_call?.details?.completed?.slot})</>
                      )}
                    </>
                  )}
                </Typography>
              </CardContent>
            ) : !CallCurrentStage && Number(sinceLastVideoCall) >= 1 ? (
              <Typography
                sx={{
                  color: 'red',
                  fontSize: '13px',
                  fontWeight: 400,
                  marginTop: '15px',
                  paddingX: '24px'
                }}
              >
                It’s been {daysSinceShortlist} days since you shortlisted agents – invite them to a video call to help
                decide who to progress to a site visit.
              </Typography>
            ) : (
              ''
            )}

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}
              className=' absolute bottom-[18px] right-2'
            >
              <CustomTooltip text='View All Video Calls' position='left' align='left'>
                <Box
                  onClick={!stages?.shortlisted?.is_current ? undefined : () => router.push('/video-calls')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '6px'
                  }}
                >
                  <i
                    className={` ${stages?.video_call?.is_current ? ' text-[#26C6F9]' : 'text-white'} ri-eye-line w-[14px] h-[14px]`}
                  ></i>
                </Box>
              </CustomTooltip>
              <CustomTooltip
                text={
                  stages?.appointment?.is_completed
                    ? "You've appointed your agent. No further actions can be taken on this tender."
                    : 'Schedule New Video Call'
                }
                position='left'
                align='left'
              >
                <Box
                  onClick={
                    stages?.appointment?.is_completed || !stages?.shortlisted?.is_current
                      ? undefined
                      : () => setOnlineCallsModalOpen(true)
                  }
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: stages?.appointment?.is_completed ? '#26C6F93D' : 'customColors.cyan3',
                    marginX: '6px',
                    cursor: stages?.shortlisted?.is_completed ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Image
                    src={
                      stages?.appointment?.is_completed
                        ? personWhiteIcon
                        : stages?.video_call?.is_current
                          ? personTodo
                          : personWhiteIcon
                    }
                    alt='video call icon'
                    className='w-[14px] h-[14px]'
                  />
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        {/* site visst  */}

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{ borderRadius: 1, height: '370PX', boxShadow: stages?.site_visit?.is_current ? '' : 'none' }}
            className=' relative '
          >
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i
                className={`ri-user-location-line ${stages?.site_visit?.is_current ? 'text-[#26C6F9]' : 'text-white'}   `}
              ></i>
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: stages?.site_visit?.is_current ? 'customColors.darkGray1' : tenderId ? '#919191E5' : '#919191E5',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Site Visits
            </Typography>

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Site Visits Can Not Be Scheduled
              </Typography>
            ) : !siteVistCurrentStage && sinceLastSiteVisit === 0 ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: 'customColors.textGray',
                  fontSize: '12px',
                  paddingX: '24px',
                  fontWeight: 300
                }}
              >
                Shortlist Agent to unlock this section
              </Typography>
            ) : siteVistCurrentStage && sinceLastSiteVisit === 0 ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: stages?.video_call?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                  fontSize: '12px',
                  paddingX: '24px',
                  fontWeight: 300
                }}
              >
                You’ve invited {dashboardResponce?.data?.schedule_calls} agents to site visit.
              </Typography>
            ) : !siteVistCurrentStage && Number(sinceLastSiteVisit) >= 1 ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: 'customColors.green5',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                No video calls booked yet.
              </Typography>
            ) : (
              ''
            )}

            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                You must launch a tender first. Site visits are scheduled with shortlisted candidates only after the
                initial review is complete.
              </Typography>
            ) : !siteVistCurrentStage && sinceLastSiteVisit === 0 ? (
              <Typography
                sx={{
                  color: stages?.site_visit?.is_current ? 'customColors.textGray' : '#919191E5',
                  fontSize: '13px',
                  fontWeight: 400,
                  marginTop: '14px',
                  paddingX: '24px'
                }}
              >
                You’ll be able to invite agents to site visits once you have shortlisted from your results.
              </Typography>
            ) : siteVistCurrentStage && sinceLastSiteVisit === 0 ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    marginTop: '14px',
                    paddingX: '1px'
                  }}
                >
                  Next Scheduled Visit : {formatDates(stages?.site_visit?.details?.upcoming?.date) || ''}{' '}
                  {stages?.site_visit?.details?.upcoming?.slot && <>({stages?.site_visit?.details?.upcoming?.slot})</>}
                </Typography>

                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    marginTop: '14px',
                    paddingX: '1px'
                  }}
                >
                  {stages?.site_visit?.details?.completed?.date && (
                    <>
                      Last Completed Visit : {stages?.site_visit?.details?.completed?.date || ''}{' '}
                      {stages?.site_visit?.details?.completed?.slot && (
                        <>({stages?.site_visit?.details?.completed?.slot})</>
                      )}
                    </>
                  )}
                </Typography>
              </CardContent>
            ) : !siteVistCurrentStage && Number(sinceLastSiteVisit) >= 1 ? (
              <Typography
                sx={{
                  color: 'red',
                  fontSize: '13px',
                  fontWeight: 400,
                  marginTop: '20px',
                  paddingX: '24px'
                }}
              >
                You shortlisted agents {daysSinceShortlist} days ago — invite them to a site visit to make your final
                decision easier.
              </Typography>
            ) : (
              ''
            )}

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}
              className=' absolute bottom-[18px] right-2'
            >
              <CustomTooltip text='View All Site visits' position='left' align='left'>
                <Box
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '6px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px] ${stages?.site_visit?.is_current ? 'text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>

              <CustomTooltip
                text={
                  stages?.appointment?.is_completed
                    ? "You've appointed your agent. No further actions can be taken on this tender."
                    : 'Schedule New Site Visits'
                }
                position='left'
                align='left'
              >
                <Box
                  onClick={
                    stages?.appointment?.is_completed || !stages?.site_visit?.is_current
                      ? undefined
                      : () => setSiteVisitsModalOpen(true)
                  }
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: stages?.appointment?.is_completed ? '#26C6F93D' : 'customColors.cyan3',
                    marginX: '6px',
                    cursor: stages?.shortlisted?.is_completed ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Image
                    src={
                      stages?.appointment?.is_completed
                        ? personWhiteIcon
                        : stages?.site_visit?.is_current
                          ? personTodo
                          : personWhiteIcon
                    }
                    alt='person icon'
                    className='w-[14px] h-[14px]'
                  />
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{ borderRadius: 1, height: '370PX', boxShadow: stages?.appointment?.is_current ? '' : 'none' }}
            className=' relative'
          >
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <Image src={stages?.appointment?.is_current ? roundStar : star} alt='appointment-image' />
            </div>

            <Typography
              sx={{
                fontSize: '30px',
                color: stages?.appointment?.is_current
                  ? 'customColors.darkGray1'
                  : tenderId
                    ? '#919191E5'
                    : '#919191E5',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              {stages?.appointment?.is_completed ? 'Agent Appointed' : 'Appoint Your Agent'}
            </Typography>

            {!tenderId ? (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: '#919191E5',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                Agent Appointment Disabled
              </Typography>
            ) : (
              <Typography
                sx={{
                  paddingTop: '8px',
                  color: stages?.appointment?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                  paddingX: '22px',
                  fontSize: '12px',
                  fontWeight: 300
                }}
              >
                {stages?.appointment?.details?.appointed_pma_name
                  ? `Agent Appointed: ${stages?.appointment?.details?.appointed_pma_name} - ${formatDates(stages?.appointment?.completed_at) == null ? '' : formatDates(stages?.appointment?.completed_at)}`
                  : 'You can choose an agent after one call or visit is done.'}
              </Typography>
            )}

            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
              {!tenderId ? (
                <Typography
                  sx={{
                    paddingTop: '8px',
                    color: '#919191E5',
                    fontSize: '12px',
                    fontWeight: 300
                  }}
                >
                  The final step of appointing an agent requires a completed tender process. Launch a tender to begin
                  qualifying and selecting your agent.
                </Typography>
              ) : !stages?.appointment?.is_completed ? (
                <Typography
                  sx={{
                    color: stages?.appointment?.is_current ? 'customColors.textGray' : '#919191E5',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px'
                  }}
                >
                  Once you’ve had meaningful discussions or met with agents, you’ll be able to appoint your chosen
                  managing agent here.
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: 'customColors.textGray',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '22px'
                  }}
                >
                  <span className='font-bold'>Congratulations, you’ve appointed a new managing agent.</span> We’ll now
                  archive this tender in 30 days.
                </Typography>
              )}
            </CardContent>

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}
              className=' absolute bottom-[18px] right-2'
            >
              <CustomTooltip text='View Final Selection ' position='left' align='left'>
                <Box
                  onClick={!stages?.appointment?.is_current ? undefined : () => router.push('/final-selection')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '6px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px] ${stages?.appointment?.is_current ? 'text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>

              {stages?.appointment?.details?.appointed_pma_name ? (
                <>
                  <CustomTooltip
                    text={`You've appointed your agent. No further actions can be taken on this tender.`}
                    position='left'
                    align='left'
                  >
                    <Box
                      sx={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'customColors.cyan3',
                        marginX: '6px',
                        cursor: stages?.shortlisted?.is_completed ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <Image src={personWhiteIcon} alt='personTodo' className={`w-[14px] h-[14px]  `} />
                    </Box>{' '}
                  </CustomTooltip>
                </>
              ) : (
                <CustomTooltip text='Appoint The Agent ' position='left' align='left'>
                  <Box
                    onClick={
                      stages?.appointment?.details?.appointed_pma_name
                        ? undefined
                        : !stages?.appointment?.is_current
                          ? undefined
                          : () => setOpenPmaDropdown(true)
                    }
                    sx={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'customColors.cyan3',
                      marginX: '6px'
                    }}
                  >
                    <Image
                      src={
                        stages?.appointment?.is_current && stages?.appointment?.details?.appointed_pma_name
                          ? personWhiteIcon
                          : stages?.appointment?.is_current
                            ? personTodo
                            : personWhiteIcon
                      }
                      alt='personTodo'
                      className={`w-[14px] h-[14px]  `}
                    />
                  </Box>
                </CustomTooltip>
              )}
            </Box>
          </Card>
        </Grid>

        <VideosCallsModal
          open={onlineCallsModalOpen}
          onClose={() => setOnlineCallsModalOpen(false)}
          mainSiteVisitVideoCalls={finalShortListedResponce?.data?.shortlisted_pma_users}
          types='fromDashboard'
        />

        <SiteVisitsModal
          open={siteVisitsModalOpen}
          onClose={() => setSiteVisitsModalOpen(false)}
          types='fromDashboard'
          shorlistedPmas={finalShortListedResponce?.data?.shortlisted_pma_users}
        />

        <AppointManagemnetModal
          open={apointAgentModalOpen}
          onClose={() => setApointAgentModalOpen(false)}
          finalShortListedResponce={finalShortListedResponce?.data?.shortlisted_pma_users}
          pmaSelectedID={pmaValue}
          setpmaValue={setpmaValue}
          selectedPmaName={selectedPmaName}
          InviteCompletedCalls={undefined}
        />

        <CommonModal
          isOpen={openPmaDropdown}
          headerSx={{ color: '#1F4E8D', fontSize: '26px', fontWeight: 600 }}
          isBorder
          handleClose={() => setOpenPmaDropdown(false)}
          header='Appoint Your Agent'
          maxWidth='sm'
          fullWidth
        >
          <div className='mt-8'>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth error={error}>
                <InputLabel
                  id='dropdown-label'
                  sx={{
                    color: '#696969',
                    '&.Mui-focused': {
                      color: '#35C0ED'
                    }
                  }}
                >
                  Choose Pma
                </InputLabel>
                <Select
                  labelId='dropdown-label'
                  value={pmaValue}
                  onChange={handleChange}
                  label='Choose Option'
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#696969'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#35C0ED !important'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#35C0ED !important'
                    },
                    '& .MuiSelect-select': {
                      paddingTop: '8px',
                      paddingBottom: '8px'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          color: '#000',
                          backgroundColor: 'transparent !important',
                          '&:hover': {
                            backgroundColor: '#35C0ED !important',
                            color: '#ffffffff'
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'transparent !important',
                            color: '#000 !important',
                            '&:hover': {
                              backgroundColor: '#35C0ED !important',
                              color: '#ffffffff !important'
                            }
                          }
                        }
                      }
                    }
                  }}
                >
                  {finalShortListedResponce?.data?.shortlisted_pma_users?.map((item: PmaUser) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.full_name}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>Please select a value</FormHelperText>}
              </FormControl>
            </Grid>
          </div>
          <div className='mt-8 flex justify-end'>
            <CustomButton
              disabled={!pmaValue}
              onClick={handleAppointAgentSelection}
              sx={{ fontSize: '14px', fontWeight: 700 }}
            >
              Select PMA
            </CustomButton>
          </div>
        </CommonModal>
      </Grid>
    </>
  )
}

export { TenderCards }
