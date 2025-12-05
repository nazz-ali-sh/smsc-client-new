import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import classnames from 'classnames'
import ReactDatepicker from 'react-datepicker'

import { useDispatch } from 'react-redux'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { setCalendarApiPayload, setCalendarStatus } from '@/redux-store/slices/rmcCalendar'
import type { SidebarLeftProps } from '@/types/apps/calendarTypes'
import CustomButton from '@/common/CustomButton'

const SidebarLeft = (props: SidebarLeftProps) => {
  const { mdAbove, leftSidebarOpen, calendarApi, handleLeftSidebarToggle } = props

  const router = useRouter()

  const [selectedFullDate, setSelectedFullDate] = useState<string | null>(null)
  const [selectedYearMonth, setSelectedYearMonth] = useState<string | null>(null)

  const [selectedFilters, setSelectedFilters] = useState<string[]>(['site_visit', 'video_call'])
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
    setSelectedFilters(prev => {
      if (prev.includes(value)) {
        return prev.filter(f => f !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  useEffect(() => {
    if (selectedFilters.length === 0) {
      dispatch(setCalendarStatus(null))

      return
    }

    const typeValue = selectedFilters.length === 2 ? '' : selectedFilters[0]

    dispatch(setCalendarStatus(typeValue))
  }, [selectedFilters, dispatch])

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
            zIndex: mdAbove ? 2 : 'drawer',
            overflowX: 'hidden'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        <section className='ml-[42px] w-full'>
          <div className='mt-[20px] text-[18px] font-bold leading-[28px] mb-[10px]'>Meeting Status</div>

          <div className='text-[15px] leading-[22px] font-normal flex items-center  gap-2'>
            <span className='inline-block w-3 h-3 rounded-full bg-buttonPrimary ml-[6px]'></span>
            Confirmed meetings
          </div>

          <div className='text-[15px] leading-[22px] font-normal flex items-center gap-2 mt-[10px]'>
            <span className='inline-block w-3 h-3 rounded-full bg-[#B2B2B2] ml-[6px]'></span>
            Pending meetings
          </div>

          <div className='text-[15px] leading-[22px] font-normal flex items-center gap-2 mt-[10px] mb-[30px]'>
            <span className='inline-block w-3 h-3 rounded-full bg-yellow-600 ml-[6px]'></span>
            Rescheduled meetings
          </div>
        </section>

        <Divider className='is-full' />
        <div className='flex justify-center is-full p-4'>
          <AppReactDatepicker>
            <ReactDatepicker
              inline
              className='cursor-pointer'
              onChange={(date: Date | null) => {
                if (date) {
                  calendarApi?.gotoDate(date)
                  const { yearMonthDate, yearMonth } = formatDateValues(date)

                  setSelectedFullDate(yearMonthDate)
                  setSelectedYearMonth(yearMonth)
                }
              }}
              onMonthChange={(date: Date) => {
                const { yearMonthDate, yearMonth } = formatDateValues(date)

                setSelectedYearMonth(yearMonth)
                setSelectedFullDate(yearMonthDate)
              }}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => (
                <div className='flex justify-between items-center p-2 cursor-pointer'>
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

        <div className='flex flex-col p-5 is-full'>
          <Typography variant='h5' className='mbe-4'>
            Event Filters
          </Typography>

          <>
            <FormControlLabel
              label='Site Visit'
              control={
                <Checkbox
                  sx={{
                    color: '#FF4D49',
                    '&.Mui-checked': { color: '#FF4D49' }
                  }}
                  checked={selectedFilters.includes('site_visit')}
                  onChange={() => handleChange('site_visit')}
                />
              }
            />

            <FormControlLabel
              label='Video Call'
              control={
                <Checkbox
                  sx={{
                    color: '#35C0ED',
                    '&.Mui-checked': { color: '#35C0ED' }
                  }}
                  checked={selectedFilters.includes('video_call')}
                  onChange={() => handleChange('video_call')}
                />
              }
            />
          </>
        </div>

        <Divider className='is-full' />

        <div className='flex flex-col p-5 is-full'>
          <Typography variant='h5' className='mbe-4'>
            Events Management
          </Typography>
          <div className='flex items-center justify-between mbe-3'>
            <Typography variant='body2'>Site Visits</Typography>
            <CustomButton variant='outlined' size='small' onClick={() => router.push(`site-visits`)}>
              View
            </CustomButton>
          </div>
          <div className='flex items-center justify-between'>
            <Typography variant='body2'> Video Calls</Typography>
            <CustomButton variant='outlined' size='small' onClick={() => router.push(`video-calls`)}>
              View
            </CustomButton>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default SidebarLeft
