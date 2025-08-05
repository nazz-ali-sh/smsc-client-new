import * as React from 'react'

import Image from 'next/image'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Divider, Typography, useTheme } from '@mui/material'

import calander from '../../../../public/images/customImages/calander.svg'
import timeLine from '../../../../public/images/customImages/timeLine.svg'
import map from '../../../../public/images/customImages/map.svg'
import useMediaQuery from '@/@menu/hooks/useMediaQuery'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
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

const TabsSwitch = () => {
  const [value, setValue] = React.useState(0)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  // Array of objects for the site visits
  const siteVisits = [
    {
      id: 1,
      day: 'Monday',
      date: '25th June 2025',
      image: calander,
      alt: 'calendar'
    },
    {
      id: 2,
      day: 'Tuesday',
      date: '26th June 2025',
      image: timeLine,
      alt: 'timeline'
    },
    {
      id: 3,
      day: 'Wednesday',
      date: '27th June 2025',
      image: map,
      alt: 'map'
    }
  ]

  // Tab labels and icons for easier mapping
  const tabsData = [
    { label: 'Site Visits', iconClass: 'ri-hotel-line' },
    { label: 'Calls', iconClass: 'ri-phone-line' },
    { label: 'Chats', iconClass: 'ri-hotel-line' },
    { label: 'Documents', iconClass: 'ri-hotel-line' },
    { label: 'Notes', iconClass: 'ri-hotel-line' }
  ]

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#35C0ED',
                height: 4,
                '&:hover': {
                  color: '#35C0ED',
                  backgroundColor: '35C0ED', // remove any default hover bg
                  opacity: 1
                }
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={tab.iconClass}></i>
                    <span>{tab.label}</span>
                  </Box>
                }
                {...a11yProps(idx)}
                sx={{
                  color: '#555555',
                  minHeight: 56,
                  '&:hover': {
                    color: '#35C0ED',
                    backgroundColor: 'transparent',
                    opacity: 1
                  },
                  '&.Mui-selected': {
                    color: '#35C0ED',
                    fontWeight: 'bold'
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Typography variant='h4' className='mt-[20px]'>
            Upcoming Site Visit
          </Typography>
          <Typography variant='body2' className='max-w-[65%] mt-[20px]'>
            Meeting with PMA - 12315566 on Monday 25th June 2025 at 11:00 AM. Location Address 123 Main Street Apt 48
            Anytown, State 12345, London
          </Typography>

          <div className='mt-5 flex flex-row justify-between'>
            {siteVisits.map(visit => (
              <section key={visit.id} className='flex flex-col items-center mb-2'>
                <Image src={visit.image} alt={visit.alt} />
                <p className='text-center mt-3'>{visit.day}</p>
                <p className='text-center'>{visit.date}</p>
                <div
                  className={`h-[10px] ${
                    visit.id === 1
                      ? 'bg-[#E1F3D7]'
                      : visit.id === 2
                        ? 'bg-[#5e728d]'
                        : visit.id === 3
                          ? 'bg-[#D5EFF9]'
                          : ''
                  } bg-yellow-200 w-[200px] rounded-xl mt-7`}
                ></div>
              </section>
            ))}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <div className='h-[3px] bg-bordercolor mt-[60px] rounded-sm'></div>
        <Divider orientation={isSmallScreen ? 'horizontal' : 'vertical'} flexItem />
      </Box>
    </>
  )
}

export default TabsSwitch
