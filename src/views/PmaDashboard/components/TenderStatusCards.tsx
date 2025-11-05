'use client'

import { Grid, Card, Typography, Divider, Box } from '@mui/material'

interface TenderStatusCardData {
  title: string
  icon: string
  iconColor: string
  bgColor: string
  today?: string
  tenderId: string
  blockType?: string
  blockName?: string
  unitCount?: string
  submissionDate?: string
  shortlistedDate?: string
  scheduledCall?: string
  scheduledVisit?: string
  appointedDate?: string
  startDate?: string
  budget?: string
  archiveMessage?: string
}

const dummyTenderData = {
  live_tenders: {
    title: 'Live Tenders',
    icon: 'ri-eye-2-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: '+30 Today',
    tenderId: 'TND01',
    blockType: 'Purpose Built Flat',
    unitCount: '23 Units',
    budget: '£100'
  },
  submitted_tenders: {
    title: 'Submitted Tenders',
    icon: 'ri-file-list-3-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: '+4 Submitted',
    tenderId: 'TND01',
    blockType: 'Purpose Built Flat',
    submissionDate: '23 July, 2025',
    budget: '£100'
  },
  shortlisted_tenders: {
    title: 'Shortlisted Tenders',
    icon: 'ri-checkbox-circle-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: '+4 Shortlisted',
    tenderId: 'TND01',
    blockType: 'Purpose Built Flat',
    submissionDate: '23 July, 2025',
    budget: '£100'
  },
  video_call: {
    title: 'Video Call',
    icon: 'ri-video-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: '+5 calls Today',
    tenderId: 'TND01',
    shortlistedDate: 'Purpose Built Flat',
    scheduledCall: '23 July, 2025 at 9:30am - 5:45am'
  },
  site_visit: {
    title: 'Site Visit',
    icon: 'ri-map-pin-user-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: '+6 visits Today',
    tenderId: 'TND01',
    shortlistedDate: 'Purpose Built Flat',
    scheduledVisit: '23 July, 2025'
  },
  appointed: {
    title: 'Appointed',
    icon: 'ri-checkbox-circle-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: '+1 Appointed Today',
    tenderId: 'TND01',
    appointedDate: '23 July, 2025',
    startDate: '23 July, 2025'
  },
  closed_tenders: {
    title: 'Closed Tenders',
    icon: 'ri-close-circle-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: undefined,
    tenderId: 'TND01',
    blockName: 'Purpose Built Flat',
    archiveMessage: 'This tender will be archived in 04 days.'
  },
  not_appointed: {
    title: 'Not Appointed',
    icon: 'ri-close-circle-line',
    iconColor: '#35C0ED',
    bgColor: '#c4edfa',
    today: undefined,
    tenderId: 'TND01',
    blockName: 'Purpose Built Flat',
    archiveMessage: 'This tender will be archived in 04 days.'
  }
}

const TenderStatusCards = () => {
  return (
    <Grid container spacing={6} sx={{ marginTop: 2 }}>
      {Object.entries(dummyTenderData).map(([key, cardData]) => {
        const card = cardData as TenderStatusCardData

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Card elevation={2} sx={{ borderRadius: '10px', height: '100%', position: 'relative' }}>
              <Box sx={{ padding: 3 }}>
                <div
                  className='p-2 rounded-full flex items-center justify-center size-[44px]'
                  style={{ backgroundColor: card.bgColor }}
                >
                  <i style={{ color: card.iconColor }} className={`${card.icon} text-[24px]`} />
                </div>

                <Typography
                  sx={{
                    fontSize: '18px',
                    color: '#374151',
                    paddingTop: '12px',
                    fontWeight: 600
                  }}
                >
                  {card.title}
                </Typography>

                {card.today && (
                  <Typography
                    sx={{
                      paddingTop: '4px',
                      color: '#6B7280',
                      fontSize: '12px',
                      fontWeight: 400
                    }}
                  >
                    {card.today}
                  </Typography>
                )}

                <Divider sx={{ marginY: 2 }} />
                <Box sx={{ minHeight: '100px', paddingBottom: '50px' }}>
                  <Typography
                    sx={{
                      color: '#6B7280',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '20px'
                    }}
                  >
                    Tender ID: <span style={{ fontWeight: 500 }}>{card.tenderId}</span>
                  </Typography>
                  {key === 'live_tenders' && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Block Type: <span style={{ fontWeight: 500 }}>{card.blockType}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Unit Count: <span style={{ fontWeight: 500 }}>{card.unitCount}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Budget: <span style={{ fontWeight: 500 }}>{card.budget}</span>
                      </Typography>
                    </>
                  )}

                  {key === 'submitted_tenders' && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Block Type: <span style={{ fontWeight: 500 }}>{card.blockType}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Submission Date: <span style={{ fontWeight: 500 }}>{card.submissionDate}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Budget: <span style={{ fontWeight: 500 }}>{card.budget}</span>
                      </Typography>
                    </>
                  )}

                  {key === 'shortlisted_tenders' && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Block Type: <span style={{ fontWeight: 500 }}>{card.blockType}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Submission Date: <span style={{ fontWeight: 500 }}>{card.submissionDate}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Budget: <span style={{ fontWeight: 500 }}>{card.budget}</span>
                      </Typography>
                    </>
                  )}

                  {key === 'video_call' && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Shortlisted Date: <span style={{ fontWeight: 500 }}>{card.shortlistedDate}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Scheduled Call: <span style={{ fontWeight: 500 }}>{card.scheduledCall}</span>
                      </Typography>
                    </>
                  )}

                  {key === 'site_visit' && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Shortlisted Date: <span style={{ fontWeight: 500 }}>{card.shortlistedDate}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Scheduled Visit: <span style={{ fontWeight: 500 }}>{card.scheduledVisit}</span>
                      </Typography>
                    </>
                  )}

                  {key === 'appointed' && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Appointed Date: <span style={{ fontWeight: 500 }}>{card.appointedDate}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Start Date: <span style={{ fontWeight: 500 }}>{card.startDate}</span>
                      </Typography>
                    </>
                  )}

                  {(key === 'closed_tenders' || key === 'not_appointed') && (
                    <>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '4px'
                        }}
                      >
                        Block Name: <span style={{ fontWeight: 500 }}>{card.blockName}</span>
                      </Typography>
                      <Typography
                        sx={{
                          color: '#EF4444',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          paddingTop: '8px'
                        }}
                      >
                        {card.archiveMessage}
                      </Typography>
                    </>
                  )}
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    display: 'flex',
                    gap: 1,
                    marginTop: 3
                  }}
                >
                  {key === 'live_tenders' && (
                    <>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-check-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                    </>
                  )}

                  {key === 'submitted_tenders' && (
                    <>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-download-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                    </>
                  )}

                  {key === 'shortlisted_tenders' && (
                    <Box
                      sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#E0F2FE',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#BAE6FD'
                        }
                      }}
                    >
                      <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                    </Box>
                  )}

                  {key === 'video_call' && (
                    <>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-edit-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-check-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                    </>
                  )}

                  {key === 'site_visit' && (
                    <>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-edit-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-check-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                    </>
                  )}

                  {key === 'appointed' && (
                    <>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                      <Box
                        sx={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#E0F2FE',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#BAE6FD'
                          }
                        }}
                      >
                        <i className='ri-check-line text-[16px] text-[#0EA5E9]'></i>
                      </Box>
                    </>
                  )}

                  {key === 'closed_tenders' && (
                    <Box
                      sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#E0F2FE',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#BAE6FD'
                        }
                      }}
                    >
                      <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                    </Box>
                  )}

                  {key === 'not_appointed' && (
                    <Box
                      sx={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#E0F2FE',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#BAE6FD'
                        }
                      }}
                    >
                      <i className='ri-eye-line text-[16px] text-[#0EA5E9]'></i>
                    </Box>
                  )}
                </Box>
              </Box>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default TenderStatusCards
