import React from 'react'

import Image from 'next/image'

import { Tabs, Tab } from '@mui/material'

import upcomingIcon from '../../../../public/images/customImages/upcomingIcon.svg'
import pendingIcon from '../../../../public/images/customImages/pendingIcon.svg'
import rechedualIcon from '../../../../public/images/customImages/reschedualIcon.svg'
import completedIcon from '../../../../public/images/customImages/completed.svg'
import cancalled from '../../../../public/images/customImages/cancelled.svg'

export interface InviteTabItem {
  label: string
  icon: () => JSX.Element
  bg: string
  color: string
}

interface InviteTabsProps {
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  tabs?: InviteTabItem[]
}

const InviteTabItems: InviteTabItem[] = [
  {
    label: 'Upcoming  Visits',
    icon: () => <Image src={upcomingIcon} alt='Upcoming Calls' width={24} height={24} />,
    bg: '#E8F9FE',
    color: '#26C6F9'
  },
  {
    label: 'Rescheduled Visits',
    icon: () => <Image src={rechedualIcon} alt='Rescheduled Call' width={24} height={24} />,
    bg: '#FDF3DC',
    color: '#FDB528'
  },
  {
    label: 'Completed Visits',
    icon: () => <Image src={completedIcon} alt='Completed Calls' width={24} height={24} />,
    bg: '#F3F8D4',
    color: '#72E128'
  },
  {
    label: 'Pending Visits',
    icon: () => <Image src={pendingIcon} alt='Pending Calls' width={24} height={24} />,
    bg: '#e7e7ea',
    color: '#FDB528'
  },
  {
    label: 'Rejected / Cancelled Visits',
    icon: () => <Image src={cancalled} alt='Rejected / Cancelled Calls' width={24} height={24} />,
    bg: '#f5dadb',
    color: '#FDB528'
  }
]

const SiteVisitTabSection: React.FC<InviteTabsProps> = ({ value, onChange }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      aria-label='invite calls tabs'
      className='mt-7'
      TabIndicatorProps={{
        style: {
          backgroundColor: '#6AC2ED',
          height: '4px',
          borderRadius: '4px'
        }
      }}
    >
      {InviteTabItems?.map((tab, index) => (
        <Tab
          key={index}
          label={
            <span className='flex items-center gap-2'>
              <div
                className='h-[42px] w-[42px] rounded-md flex justify-center items-center'
                style={{ backgroundColor: tab.bg, color: tab.color }}
              >
                {tab?.icon()}
              </div>
              {tab.label}
            </span>
          }
          sx={{
            textTransform: 'none',
            fontWeight: value === index ? 700 : 500,
            color: '#939393 !important',
            borderColor: '#35C0ED33 !important',
            '&.Mui-selected': {
              color: '#939393 !important'
            },
            '&:hover': {
              color: '#35C0ED !important',
              backgroundColor: 'transparent !important',
              '& span': {
                color: '#35C0ED !important'
              },
              '& div': {
                color: '#35C0ED !important'
              }
            },
            '& .MuiTouchRipple-root': {
              color: '#35C0ED !important'
            },
            '& .MuiTouchRipple-child': {
              backgroundColor: '#35C0ED !important'
            }
          }}
        />
      ))}
    </Tabs>
  )
}

export default SiteVisitTabSection
