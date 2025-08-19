import React from 'react'

import { Tabs, Tab } from '@mui/material'

export interface InviteTabItem {
  label: string
  icon: string
  bg: string
  color: string
}

interface InviteTabsProps {
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  tabs: InviteTabItem[]
}

const SiteVisitTabSection: React.FC<InviteTabsProps> = ({ value, onChange, tabs }) => {
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
      {tabs?.map((tab, index) => (
        <Tab
          key={index}
          label={
            <span className='flex items-center gap-2'>
              <div
                className='h-[42px] w-[42px] rounded-md flex justify-center items-center'
                style={{ backgroundColor: tab.bg, color: tab.color }}
              >
                <i className={tab.icon} />
              </div>
              {tab.label}
            </span>
          }
          sx={{
            textTransform: 'none',
            fontWeight: value === index ? 700 : 500,
            '&.Mui-selected': {
              color: '#939393'
            },
            '&:hover': {
              color: 'inherit'
            }
          }}
        />
      ))}
    </Tabs>
  )
}

export default SiteVisitTabSection
