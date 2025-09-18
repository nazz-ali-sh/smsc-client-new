import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import classnames from 'classnames'
import ReactDatepicker from 'react-datepicker'

import { useDispatch } from 'react-redux'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import SiteVisitsModal from '@/common/SiteVisitsModal'
import VideosCallsModal from '@/common/VideosCallsModal'
import { setCalendarApiPayload, setCalendarStatus } from '@/redux-store/slices/rmcCalendar'
import type { SidebarLeftProps } from '@/types/apps/calendarTypes'

const SidebarLeft = (props: SidebarLeftProps) => {
  const { mdAbove, leftSidebarOpen, calendarApi, handleLeftSidebarToggle } = props

  const [siteVisitsModalOpen, setSiteVisitsModalOpen] = useState(false)
  const [onlineCallsModalOpen, setOnlineCallsModalOpen] = useState(false)
  const [selectedFullDate, setSelectedFullDate] = useState<string | null>(null)
  const [selectedYearMonth, setSelectedYearMonth] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>('')
  const dispatch = useDispatch()

  const tenderId = 8
  const status = 'month'

  useEffect(() => {
    if (selectedYearMonth || selectedFullDate) {
      dispatch(
        setCalendarApiPayload({
          tenderId,
          status,
          selectedYearMonth,
          selectedFullDate
        })
      )
    }
  }, [tenderId, status, selectedYearMonth, selectedFullDate, dispatch])

  const formatDateValues = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return {
      yearMonthDate: `${year}-${month}-${day}`,
      yearMonth: `${year}-${month}`
    }
  }

  const handleChange = (value: string) => {
    setSelectedFilter(prev => (prev === value ? '' : value))
    dispatch(setCalendarStatus(selectedFilter))
  }

  useEffect(() => {
    dispatch(setCalendarStatus(selectedFilter))
  }, [selectedFilter, dispatch])

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
            onClick={() => setOnlineCallsModalOpen(true)}
          >
            Schedule Video Call
          </Button>
        </div>

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
            onClick={() => setSiteVisitsModalOpen(true)}
          >
            Schedule Site Visit
          </Button>
        </div>

        <Divider className='is-full' />

        {/* Date Picker */}
        <div className='flex justify-center is-full p-4'>
          <AppReactDatepicker>
            <ReactDatepicker
              inline
              onChange={(date: Date | null) => {
                if (date) {
                  calendarApi?.gotoDate(date)
                  const { yearMonthDate, yearMonth } = formatDateValues(date)

                  setSelectedFullDate(yearMonthDate)
                  setSelectedYearMonth(yearMonth)
                }
              }}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
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
                    {date.toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
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

        {/* Filters */}
        <div className='flex flex-col p-5 is-full'>
          <Typography variant='h5' className='mbe-4'>
            Event Filters
          </Typography>

          {/* check box rendet here */}
          <>
            <FormControlLabel
              label='Site Visit'
              control={
                <Checkbox checked={selectedFilter === 'site_visit'} onChange={() => handleChange('site_visit')} />
              }
            />
            <FormControlLabel
              label='Video Call'
              control={
                <Checkbox checked={selectedFilter === 'video_call'} onChange={() => handleChange('video_call')} />
              }
            />
          </>
        </div>

        <Divider className='is-full' />

        {/* Meeting Requests */}
        <div className='flex flex-col p-5 is-full'>
          <Typography variant='h5' className='mbe-4'>
            Meeting Requests
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

      {/* Modals */}
      <VideosCallsModal
        open={onlineCallsModalOpen}
        onClose={() => setOnlineCallsModalOpen(false)}
        types='fromCalender'
        mainSiteVisitVideoCalls={undefined}
      />
      <SiteVisitsModal
        open={siteVisitsModalOpen}
        onClose={() => setSiteVisitsModalOpen(false)}
        types='siteVisitFromCalender'
      />
    </>
  )
}

export default SidebarLeft
