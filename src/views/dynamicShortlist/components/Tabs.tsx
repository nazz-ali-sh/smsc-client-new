import * as React from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Typography, useTheme } from '@mui/material'

import { useDispatch } from 'react-redux'

import calendar from '../../../../public/images/customImages/calander.svg'
import timeLine from '../../../../public/images/customImages/timeLine.svg'
import map from '../../../../public/images/customImages/map.svg'
import useMediaQuery from '@/@menu/hooks/useMediaQuery'
import { setActiveTab } from '@/redux-store/slices/tabSlice'
import CustomButton from '@/common/CustomButton'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface TabsSwitchProps {
  sendDataToParent?: (selectedLabel: string) => void
  data: any
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const tabsData = [
  { label: 'site-visits', mainLabel: 'Site Visits', iconClass: 'ri-hotel-line' },
  { label: 'Calls', mainLabel: 'Calls', iconClass: 'ri-phone-line' },
  { label: 'Chats', mainLabel: 'Chats', iconClass: 'ri-hotel-line' },
  { label: 'Documents', mainLabel: 'Documents', iconClass: 'ri-hotel-line' },
  { label: 'Notes', mainLabel: 'Notes', iconClass: 'ri-hotel-line' }
]

const TabsSwitch: React.FC<TabsSwitchProps> = ({ data }) => {
  const [value, setValue] = React.useState(0)
  const dispatch = useDispatch()

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const selectedLabel = tabsData[newValue].mainLabel

    if (selectedLabel == 'Calls') {
      dispatch(setActiveTab('calls'))
    } else dispatch(setActiveTab(selectedLabel))
  }

  const router = useRouter()

  const navigateTo = (route: string) => {
    router.push(route)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            width: '100%',
            '& .MuiTab-root': {
              minHeight: 60,
              textTransform: 'none',
              fontSize: '0.875rem',
              color: '#666',
              borderColor: '#35C0ED33 !important',
              flex: 1,
              padding: '8px 16px',
              '&.Mui-selected': {
                color: '#35C0ED',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#35C0ED',
              height: 3
            },
            '& .MuiTabs-flexContainer': {
              gap: '38px',
              flexDirection: 'row',
              alignItems: 'center'
            }
          }}
        >
          {tabsData.map((tab, idx) => (
            <Tab
              key={idx}
              disableRipple
              label={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%'
                  }}
                >
                  <i
                    className={tab.iconClass}
                    style={{
                      fontSize: '1.25rem',
                      color: value === idx ? '#35C0ED' : '#666'
                    }}
                  />
                  <Typography
                    variant='caption'
                    sx={{
                      color: value === idx ? '#35C0ED' : '#666',
                      fontWeight: value === idx ? 600 : 400,
                      fontSize: '0.875rem'
                    }}
                  >
                    {tab.mainLabel}
                  </Typography>
                </Box>
              }
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className='flex justify-between items-center'>
          <Typography variant='h4' className='mt-[20px]'>
            Upcoming Site Visit
          </Typography>
          <CustomButton onClick={() => navigateTo('/site-visits')}>View History</CustomButton>
        </div>
        <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
          Meeting with PMA - {data?.data?.pma_user?.name} on{' '}
          {data?.data?.upcoming_site_visit?.date || 'Monday 25th June 2025'} at{' '}
          {data?.data?.upcoming_site_visit?.time || '11:00 AM'}. Location Address{' '}
          {data?.data?.company_details?.address || '123 Main Street Apt 48, Anytown, State 12345, London'}
        </Typography>
        <div className={`mt-5 flex ${isSmallScreen ? 'flex-col' : 'flex-row justify-between'}`}>
          <section className='flex flex-col items-center mb-2'>
            <Image src={calendar} alt='calendar' />
            <p className='text-center mt-3'>{data?.data?.upcoming_site_visit?.day || 'Monday'}</p>
            <p className='text-center'>{data?.data?.upcoming_site_visit?.date || '25th June 2025'}</p>
            <div className='h-[10px] bg-[#E1F3D7] w-[200px] rounded-xl mt-7'></div>
          </section>

          <section className='flex flex-col items-center mb-2'>
            <Image src={timeLine} alt='calendar' />
            <p className='text-center mt-3 mb-[22px]'>{data?.data?.upcoming_site_visit?.time || '11:00 AM'}</p>
            <div className='h-[10px] bg-[#E1F3D7] w-[200px] rounded-xl mt-7'></div>
          </section>

          <section className='flex flex-col items-center mb-2'>
            <Image src={map} alt='timeline' />
            <p className='text-center mt-3 h-[44px]'>{data?.data?.company_details?.address || 'Adress'}</p>
            <div className='h-[10px] bg-[#5e728d] w-[200px] rounded-xl mt-7'></div>
          </section>
        </div>
      </CustomTabPanel>

      {/* Calls Tab */}
      <CustomTabPanel value={value} index={1}>
        <div className='flex justify-between items-center'>
          <Typography variant='h4' className='mt-[20px]'>
            Upcoming Calls
          </Typography>
          <CustomButton onClick={() => navigateTo('/video-calls')}>View History</CustomButton>
        </div>
        <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
          Meeting with PMA - {data?.data?.pma_user?.name} on{' '}
          {data?.data?.upcoming_video_call?.date || 'Monday 25th June 2025'} at
          {data?.data?.upcoming_video_call?.time || '11:00 AM'}. Location Address
          {data?.data?.company_details?.address || '123 Main Street Apt 48, Anytown, State 12345, London'}
        </Typography>
        <div className={`mt-5 flex ${isSmallScreen ? 'flex-col' : 'flex-row justify-center gap-x-[146px]'}`}>
          <section className='flex flex-col items-center mb-2'>
            <Image src={calendar} alt='calendar' />
            <p className='text-center mt-3'>{data?.data?.upcoming_video_call?.day || 'No Data'}</p>
            <p className='text-center'>{data?.data?.upcoming_video_call?.date || '25th June 2025'}</p>
            <div className='h-[10px] bg-[#E1F3D7] w-[200px] rounded-xl mt-7'></div>
          </section>

          <section className='flex flex-col items-center mb-2'>
            <Image src={timeLine} alt='calendar' />
            <p className='text-center mt-3'>{data?.data?.upcoming_video_call?.day || 'No Data'}</p>
            <p className='text-center'>{data?.data?.upcoming_video_call?.time || '11:00 AM'}</p>
            <div className='h-[10px] bg-[#5e728d] w-[200px] rounded-xl mt-7'></div>
          </section>
        </div>
      </CustomTabPanel>

      {/* Chats Tab */}
      <CustomTabPanel value={value} index={2}>
        <Typography variant='h4' className='mt-[20px]'>
          Recent Chats
        </Typography>
        <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
          {data?.data?.chats?.length
            ? data.data.chats.map((chat: any, idx: any) => (
                <div key={idx}>
                  Chat with {chat.user || 'Unknown'} on {chat.date || 'N/A'}
                </div>
              ))
            : 'No recent chats.'}
        </Typography>
      </CustomTabPanel>

      {/* Documents Tab */}
      <CustomTabPanel value={value} index={3}>
        <Typography variant='h4' className='mt-[20px]'>
          Documents
        </Typography>
        <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
          {data?.data?.documents?.length
            ? data.data.documents.map((doc: any, idx: any) => (
                <div key={idx}>
                  Document: {doc.title || 'Untitled'} (Uploaded on {doc.date || 'N/A'})
                </div>
              ))
            : 'No documents available.'}
        </Typography>
      </CustomTabPanel>

      {/* Notes Tab */}
      <CustomTabPanel value={value} index={4}>
        <Typography variant='h4' className='mt-[20px]'>
          Notes
        </Typography>
        <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
          {data?.data?.notes?.length
            ? data.data.notes.map((note: any, idx: any) => (
                <div key={idx}>
                  Note: {note.content || 'No content'} (Created on {note.date || 'N/A'})
                </div>
              ))
            : 'No notes available.'}
        </Typography>
      </CustomTabPanel>
    </Box>
  )
}

export default TabsSwitch
