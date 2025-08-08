import { useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

import classnames from 'classnames'

import ReactDatepicker from 'react-datepicker'

import type { SidebarLeftProps, CalendarFiltersType } from '@/types/apps/calendarTypes'
import type { ThemeColor } from '@core/types'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import { filterCalendarLabel, selectedEvent } from '@/redux-store/slices/rmcCalendar'
import SiteVisitsModal from './SiteVisitsModal'
import OnlineCallsModal from './OnlineCallsModal'

const SidebarLeft = (props: SidebarLeftProps) => {
  const {
    mdAbove,
    leftSidebarOpen,
    calendarStore,
    calendarsColor,
    calendarApi,
    dispatch,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)

  const colorsArr = calendarsColor ? Object.entries(calendarsColor) : []

  const renderFilters = colorsArr.length
    ? colorsArr
        .filter(([key]: string[]) => key === 'Site Visits' || key === 'Online Calls')
        .map(([key, value]: string[]) => {
          return (
            <FormControlLabel
              className='mbe-1'
              key={key}
              label={key}
              control={
                <Checkbox
                  color={value as ThemeColor}
                  checked={calendarStore.selectedCalendars.indexOf(key as CalendarFiltersType) > -1}
                  onChange={() => dispatch(filterCalendarLabel(key as CalendarFiltersType))}
                />
              }
            />
          )
        })
    : null

  const handleSidebarToggleSidebar = () => {
    dispatch(selectedEvent(null))
    handleAddEventSidebarToggle()
  }

  if (renderFilters) {
    return (
      <>
        <Drawer
          open={leftSidebarOpen}
          onClose={handleLeftSidebarToggle}
          variant={mdAbove ? 'permanent' : 'temporary'}
          ModalProps={{
            disablePortal: true,
            disableAutoFocus: true,
            disableScrollLock: true,
            keepMounted: true
          }}
          className={classnames('block', { static: mdAbove, absolute: !mdAbove })}
          PaperProps={{
            className: classnames('items-start is-[280px] shadow-none rounded rounded-se-none rounded-ee-none', {
              static: mdAbove,
              absolute: !mdAbove
            })
          }}
          sx={{
            zIndex: 3,
            '& .MuiDrawer-paper': {
              zIndex: mdAbove ? 2 : 'drawer'
            },
            '& .MuiBackdrop-root': {
              borderRadius: 1,
              position: 'absolute'
            }
          }}
        >
          <div className='is-full p-5'>
            <Button
              fullWidth
              sx={{
                color: 'white',
                backgroundColor: 'customColors.ligthBlue',
                '&:hover': {
                  backgroundColor: 'customColors.ligthBlue'
                }
              }}
              onClick={handleSidebarToggleSidebar}
            >
              Schedule Visit / Call
            </Button>
          </div>
          <Divider className='is-full' />
          <div className='flex justify-center is-full p-4'>
            <AppReactDatepicker>
              <ReactDatepicker
                inline
                onChange={(date: Date | null) => date && calendarApi?.gotoDate(date)}
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled
                }: {
                  date: Date
                  decreaseMonth: () => void
                  increaseMonth: () => void
                  prevMonthButtonDisabled: boolean
                  nextMonthButtonDisabled: boolean
                }) => (
                  <div className='flex justify-between items-center p-2'>
                    <button
                      type='button'
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      className='p-1 hover:bg-gray-100 rounded'
                    >
                      <i className='ri-arrow-left-s-line' />
                    </button>
                    <span className='font-semibold text-sm'>
                      {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      type='button'
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      className='p-1 hover:bg-gray-100 rounded'
                    >
                      <i className='ri-arrow-right-s-line' />
                    </button>
                  </div>
                )}
              />
            </AppReactDatepicker>
          </div>
          <Divider className='is-full' />
          <div className='flex flex-col p-5 is-full'>
            <Typography variant='h5' className='mbe-4'>
              Event Filters
            </Typography>
            {renderFilters}
          </div>
          <Divider className='is-full' />
          <div className='flex flex-col p-5 is-full'>
            <Typography variant='h5' className='mbe-4'>
              Events Notification
            </Typography>
            <div className='flex items-center justify-between mbe-3'>
              <Typography variant='body2'>Site Visits</Typography>
              <Button
                variant='outlined'
                size='small'
                onClick={() => setSiteVisitsModalOpen(true)}
                sx={{
                  height: 20,
                  borderColor: 'customColors.cyan2',
                  color: 'customColors.cyan2',
                  backgroundColor: 'transparent !important',
                  '&:hover': {
                    borderColor: 'customColors.cyan2',
                    backgroundColor: 'transparent !important',
                    color: 'customColors.cyan2'
                  }
                }}
              >
                Invite
              </Button>
            </div>
            <div className='flex items-center justify-between'>
              <Typography variant='body2'>Online Calls</Typography>
              <Button
                variant='outlined'
                size='small'
                onClick={() => setOnlineCallsModalOpen(true)}
                sx={{
                  height: 20,
                  borderColor: 'customColors.cyan2',
                  color: 'customColors.cyan2',
                  backgroundColor: 'transparent !important',
                  '&:hover': {
                    borderColor: 'customColors.cyan2',
                    backgroundColor: 'transparent !important',
                    color: 'customColors.cyan2'
                  }
                }}
              >
                Invite
              </Button>
            </div>
          </div>
        </Drawer>

        <SiteVisitsModal open={siteVisitsModalOpen} onClose={() => setSiteVisitsModalOpen(false)} />
        <OnlineCallsModal open={onlineCallsModalOpen} onClose={() => setOnlineCallsModalOpen(false)} />
      </>
    )
  } else {
    return null
  }
}

export default SidebarLeft
