import React from 'react'

import Image from 'next/image'

import { Tabs, Tab } from '@mui/material'

import issued_icon from '../../../../public/svgs/issued_invoice.svg'
import pendingIcon from '../../../../public/svgs/pending_invoices.svg'
import paid_icon from '../../../../public/svgs/paid_invoices.svg'
import overdue_icon from '../../../../public/svgs/overdue_invoices.svg'
import type { InvoiceTabItem, InvoiceTabsProps} from './types'

const InvoiceTabItems: InvoiceTabItem[] = [
  {
    label: 'Pending Invoices',
    icon: () => <Image src={pendingIcon} alt='Pending Invoices' width={24} height={24} />,
    bg: '#686B7C29',
    color: '#686B7C'
  },
  {
    label: 'Issued Invoices',
    icon: () => <Image src={issued_icon} alt='Issued Invoices' width={24} height={24} />,
    bg: '#FDB52829',
    color: '#FDB528'
  },
  {
    label: 'Overdue Invoices',
    icon: () => <Image src={overdue_icon} alt='Overdue Invoices' width={24} height={24} />,
    bg: '#FF000029',
    color: '#FF0000'
  },
  {
    label: 'Paid Invoices',
    icon: () => <Image src={paid_icon} alt='Paid Invoices' width={24} height={24} />,
    bg: '#ccf4de',
    color: '#72E128'
  }
]

const InvoiceTabSection: React.FC<InvoiceTabsProps> = ({ value, onChange }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      aria-label='invoice tabs'
      className='mt-7'
      sx={{
        width: '65%',
        '& .MuiTab-root': {
          minHeight: 60,
          textTransform: 'none',
          fontSize: '0.875rem',
          color: '#666',
          flex: 1,
          padding: '8px 10px',
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
          gap: '20px',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }}
    >
      {InvoiceTabItems.map((tab, index) => (
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
              {tab?.label}
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

export default InvoiceTabSection
