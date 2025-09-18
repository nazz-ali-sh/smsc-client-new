'use client'
import { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Grid, Card, CardContent, Typography, Divider, Box  } from '@mui/material'

import phone from '../../../public/images/dashboardImages/phone.svg'
import phonewhite from '../../../public/images/dashboardImages/phoneWhiteIcon.svg'
import roundStar from '../../../public/images/dashboardImages/roundStar.svg'
import personTodo from '../../../public/images/dashboardImages/persontodo.svg'
import star from '../../../public/images/dashboardImages/star.svg'
import CustomTooltip from '../../common/CustomTooltip'
import VideosCallsModal from '@/common/VideosCallsModal'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import AppointManagemnetModal from '@/common/AppointManagemnetAgent'

interface dashboardResponceprops {
  dashboardResponce?: any
}

const TenderCards: React.FC<dashboardResponceprops> = ({ dashboardResponce }) => {
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [apointAgentModalOpen, setApointAgentModalOpen] = useState(false)

  const stages = dashboardResponce?.data?.tender_stage_progress?.stages
  const router = useRouter()

  const bookedCall = dashboardResponce?.data?.days_since_last_video_call
  const bookedsiteVisit = dashboardResponce?.data?.days_since_last_site_visit

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370px' }} className='shadow-lg'>
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i style={{ color: '#35c0ed' }} className='ri-eye-2-line size-[24px]' />
            </div>

            <Typography
              sx={{
                fontSize: '30px',
                color: 'customColors.darkGray1',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Tender Overview
            </Typography>
            <Typography
              sx={{
                paddingTop: '8px',
                color: stages?.went_live?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                paddingX: '22px',
                fontSize: '12px',
                fontWeight: 300
              }}
            >
              View and edit information on your tender
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />

            {stages?.went_live?.is_completed && stages?.went_live?.details ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400, lineHeight: '22px' }}
                >
                  Reference Number: {stages?.went_live?.details?.tender_number}
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
                  Tender Type: {stages?.went_live?.details?.tender_type}
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
                  Submitted On: {stages?.went_live?.details?.tender_creation_date}
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
                  Deadline: {stages?.went_live?.details?.tender_expiry_date}
                </Typography>
              </CardContent>
            ) : (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography
                  sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400, lineHeight: '22px' }}
                >
                  Tender details will be available once it goes live.
                </Typography>
              </CardContent>
            )}
            <Box
              onClick={!stages?.went_live?.is_completed ? undefined : () => router.push('/tender-information-update')}
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '30px' }}
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
                    marginX: '22px'
                  }}
                >
                  <i className='ri-eye-line w-[14px] h-[14px] text-[#26C6F9]'></i>
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370PX' }} className='shadow-lg'>
            <div className='bg-[#c4edfa] mx-[22px]  p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i
                className={`ri-database-line size-[24px] ${stages?.result_received?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
              />
            </div>

            <Typography
              sx={{
                fontSize: '30px',
                color: 'customColors.darkGray1',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Tender Results
            </Typography>
            <Typography
              sx={{
                paddingTop: '8px',
                color:
                  stages?.result_received?.is_completed === true
                    ? 'customColors.green5'
                    : stages?.result_received?.is_completed === false
                      ? 'ustomColors.textGray'
                      : 'customColors.textGray',
                paddingX: '22px',
                fontSize: '12px',
                fontWeight: 300
              }}
            >
              Your tender was sent to {stages?.result_received?.details?.pma_count} PMCs. You have received{' '}
              {stages?.result_received?.details?.total_response_count} responses
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
            {stages?.result_received?.is_completed === true ? (
              <>
                <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                  <Typography
                    sx={{
                      color: 'customColors.textGray',
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: '22px'
                    }}
                  >
                    Tender ended on : {stages?.result_received?.details?.tender_end_date}
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
                    Results received on : 2{stages?.result_received?.details?.tender_response_date}
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
                    Tender sent to : {stages?.result_received?.details?.pma_count} PMCs
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
                    Total results received : {stages?.result_received?.details?.total_response_count} PMCs
                  </Typography>
                </CardContent>
              </>
            ) : (
              <>
                <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                  <Typography
                    sx={{
                      color: 'customColors.textGray',
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      paddingTop: '2px'
                    }}
                  >
                    You’ll be able to review all proposals anonymously once the deadline passes and agents have
                    submitted their responses
                  </Typography>
                </CardContent>
              </>
            )}

            <Box
              onClick={!stages?.result_received?.is_completed ? undefined : () => router.push('/tender-information')}
              sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '30px' }}
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
                    marginX: '22px'
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

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370PX' }} className='shadow-lg'>
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <i
                className={`ri-list-check-2 size-[24px] ${stages?.shortlisted?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
              />
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: 'customColors.darkGray1',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Shortlisted
            </Typography>
            <Typography
              sx={{
                paddingTop: '8px',
                color: stages?.shortlisted?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                paddingX: '22px',
                fontSize: '12px',
                fontWeight: 300
              }}
            >
              {stages?.shortlisted?.is_completed ? 'You’ve shortlisted X agents.' : 'No shortlisted agents yet'}
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
            <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
              <Typography
                sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400, lineHeight: '22px' }}
              >
                {stages?.shortlisted?.is_completed == true
                  ? '  View Company Information On The Managing Agents You Have Shortlisted'
                  : 'You’ve had your results for X days — shortlist now to move forward.  '}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}>
              <CustomTooltip text='Short List Agent ' position='left' align='left'>
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
                    marginX: '22px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px]  ${stages?.shortlisted?.is_completed ? ' text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>

              <CustomTooltip text='Blnd tender ' position='left' align='left'>
                <Box
                  onClick={!stages?.shortlisted?.is_completed ? undefined : () => router.push('/tender-information')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <i
                    className={`ri-group-fill w-[14px] h-[14px] ${stages?.shortlisted?.is_completed ? ' text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370PX' }} className='shadow-lg'>
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <Image src={stages?.video_call?.is_completed ? phone : phonewhite} alt='phone-image' />
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: 'customColors.darkGray1',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Video Calls
            </Typography>
            <Typography
              sx={{
                paddingTop: '8px',
                color: stages?.video_call?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                paddingX: '22px',
                fontSize: '12px',
                fontWeight: 300
              }}
            >
              {bookedCall == null
                ? 'Shortlist Agent to unlock this section.'
                : bookedCall > 0
                  ? `You’ve invited ${dashboardResponce?.data?.schedule_calls} agents to video calls. `
                  : 'No video calls booked yet.'}
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
            {stages?.video_call?.is_completed ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400 }}>
                  Next Scheduled Call : {stages?.video_call?.details?.upcoming?.date || 'N/A'} (
                  {stages?.video_call?.details?.upcoming?.slot || '-'})
                </Typography>
                <Typography sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400 }}>
                  Last Completed Call : {stages?.video_call?.details?.completed?.date || 'N/A'} (
                  {stages?.video_call?.details?.completed?.slot || '-'})
                </Typography>
              </CardContent>
            ) : (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400 }}>
                  You’ll be able to invite agents to video calls once you have shortlisted from your results.
                </Typography>
              </CardContent>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}>
              <CustomTooltip text='View All Video Calls' position='left' align='left'>
                <Box
                  onClick={!stages?.shortlisted?.is_completed ? undefined : () => router.push('/invites-video-calls')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <i
                    className={` ${stages?.video_call?.is_completed ? ' text-[#26C6F9]' : 'text-white'} ri-eye-line w-[14px] h-[14px]`}
                  ></i>
                </Box>
              </CustomTooltip>

              <CustomTooltip text='Schedual New Video call' position='left' align='left'>
                <Box
                  onClick={stages?.shortlisted?.is_completed ? undefined : () => setOnlineCallsModalOpen(true)}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <i
                    className={`ri-group-fill w-[14px] h-[14px] ${stages?.video_call?.is_completed ? ' text-[#26C6F9]' : 'text-white'}`}
                  ></i>
                </Box>
              </CustomTooltip>
            </Box>
            <VideosCallsModal
              open={onlineCallsModalOpen}
              onClose={() => setOnlineCallsModalOpen(false)}
              mainSiteVisitVideoCalls={undefined}
              types='fromDashboard'
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370PX' }} className='shadow-lg'>
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              {/* <Image src={person} alt='site-visit-image' /> */}
              <i
                className={`ri-user-location-line ${stages?.site_visit?.is_completed ? 'text-[#26C6F9]' : 'text-white'}   `}
              ></i>
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: 'customColors.darkGray1',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Site Visits
            </Typography>
            <Typography
              sx={{
                paddingTop: '8px',
                color: stages?.site_visit?.is_completed ? 'customColors.green5' : 'customColors.textGray',
                paddingX: '22px',
                fontSize: '12px',
                fontWeight: 300
              }}
            >
              {bookedsiteVisit == null
                ? 'Shortlist Agent to unlock this section.'
                : bookedsiteVisit > 0
                  ? ` You’ve invited ${dashboardResponce?.data?.schedule_calls} agents to Site visit.  `
                  : 'No site visits booked yet.'}
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
            {stages?.site_visit?.is_completed ? (
              <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
                <Typography sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400 }}>
                  Next Scheduled Visit : {stages?.site_visit?.details?.upcoming?.date || 'N/A'} (
                  {stages?.site_visit?.details?.upcoming?.slot || '-'})
                </Typography>
                <Typography sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400 }}>
                  Last Completed Visit : {stages?.site_visit?.details?.completed?.date || 'N/A'} (
                  {stages?.site_visit?.details?.completed?.slot || '-'})
                </Typography>
              </CardContent>
            ) : (
              <CardContent>
                <Typography sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400 }}>
                  You’ll be able to invite agents to site visits once you have shortlisted from your results.
                </Typography>
              </CardContent>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}>
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
                    marginX: '22px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px] ${stages?.site_visit?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>

              <CustomTooltip text='View All Site Visits' position='left' align='left'>
                <Box
                  onClick={!stages?.shortlisted?.is_completed ? undefined : () => router.push('/invites-side-visits')}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <Image
                    src={personTodo}
                    alt='personTodo'
                    className={`w-[14px] h-[14px] text-[#26C6F9] ${stages?.site_visit?.is_completed ? 'text-[#26C6F9]' : 'text-white'}  `}
                  />
                </Box>
              </CustomTooltip>
              <CustomTooltip text='View All Site Visits' position='left' align='left'>
                <Box
                  onClick={!stages?.site_visit?.is_completed ? undefined : () => setSiteVisitsModalOpen(true)}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <i
                    className={`ri-group-fill w-[14px] h-[14px] text-[#26C6F9] ${stages?.site_visit?.is_completed ? 'text-[#26C6F9]' : 'text-white'}  `}
                  ></i>
                </Box>
              </CustomTooltip>
            </Box>

            <SiteVisitsModal
              open={siteVisitsModalOpen}
              // defaultmultiselect={selectedPma}
              onClose={() => setSiteVisitsModalOpen(false)}
              types={null}

              // shorlistedPmas={finalShortListedResponce?.data?.shortlisted_pmas}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ borderRadius: 1, height: '370PX' }} className='shadow-lg'>
            <div className='bg-[#c4edfa] mx-[22px] p-2 rounded-full flex items-center justify-center mt-[24px] size-[44px]'>
              <Image src={stages?.appointment?.is_completed ? roundStar : star} alt='appointment-image' />
            </div>
            <Typography
              sx={{
                fontSize: '30px',
                color: 'customColors.darkGray1',
                paddingTop: '8px',
                paddingX: '22px',
                fontWeight: 500
              }}
            >
              Appoint Your Agent
            </Typography>
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
                ? `Agent Name: ${stages?.appointment?.details?.appointed_pma_name}-Date of Appointment`
                : 'You can choose an agent after one call or visit is done.'}
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: '#D9D9D9', my: 1, marginTop: '14px' }} />
            <CardContent sx={{ px: 2, pb: 2, paddingX: '22px' }}>
              <Typography
                sx={{ color: 'customColors.textGray', fontSize: '13px', fontWeight: 400, lineHeight: '22px' }}
              >
                {stages?.appointment?.details?.message ||
                  'Once you’ve had meaningful discussions or met with agents, you’ll be able to appoint  your chosen managing agent here.'}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '80px' }}>
              <CustomTooltip text='View Final Seletion ' position='left' align='left'>
                <Box
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <i
                    className={`ri-eye-line w-[14px] h-[14px] ${stages?.appointment?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
                  ></i>
                </Box>
              </CustomTooltip>

              <CustomTooltip text='Appoint The Agent ' position='left' align='left'>
                <Box
                  onClick={stages?.appointment?.is_completed ? undefined : () => setApointAgentModalOpen(true)}
                  sx={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'customColors.cyan3',
                    marginX: '22px'
                  }}
                >
                  <Image
                    src={personTodo}
                    alt='personTodo'
                    className={`w-[14px] h-[14px] ${stages?.appointment?.is_completed ? 'text-[#26C6F9]' : 'text-white'} `}
                  />
                </Box>
              </CustomTooltip>
            </Box>
            <AppointManagemnetModal
              open={apointAgentModalOpen}
              onClose={() => setApointAgentModalOpen(false)}
              // finalShortListedResponce={finalShortListedResponce}
              // pmaSelectedID={pmaSelectedID}
              InviteCompletedCalls={undefined}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export { TenderCards }
