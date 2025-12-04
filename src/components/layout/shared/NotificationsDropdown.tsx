'use client'

import { useRef, useState } from 'react'

import Image from 'next/image'

import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'

import type { Theme } from '@mui/material/styles'

import classnames from 'classnames'

import { Box } from '@mui/material'

import notificationmark from '../../../../public/images/dashboardImages/notificationMark.svg'
import graymark from '../../../../public/images/dashboardImages/grayMark.svg'

import themeConfig from '@configs/themeConfig'

import { useSettings } from '@core/hooks/useSettings'
import { useNotifications } from '@/hooks/useNotifications'
import CustomButton from '@/common/CustomButton'
import { useNavigateTo } from '@/utils/navigator'
import CustomTooltip from '@/common/CustomTooltip'

import type { NotificationsType } from './shareType'
import NotificationDropDown from '@/views/Notification/NotificationDropDown'

interface NotificationsDropdownProps {
  notifications?: NotificationsType[]
  notificationss?: NotificationsType[]
}

const NotificationDropdown: React.FC<NotificationsDropdownProps> = ({ notificationss }) => {
  console.log(notificationss)
  const navigateTo = useNavigateTo()

  // const user = useSelector((state: any) => state.users?.user)
  // console.log(user)
  const userId = 29

  const { notifications, unreadCount, totalCount, markAllAsRead } = useNotifications(userId)

  const [open, setOpen] = useState(false)
  const readAll = notifications.every(notification => notification.read_at !== null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const { settings } = useSettings()

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const readAllNotifications = async () => {
    if (!readAll) {
      try {
        await markAllAsRead()
      } catch (error) {
        console.error('Failed to mark all as read:', error)
      }
    }
  }

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} className='text-textPrimary'>
        <Badge
          color='error'
          overlap='circular'
          invisible={unreadCount === 0}
          badgeContent={unreadCount}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              minWidth: '18px',
              height: '18px',
              fontSize: '9px',
              padding: 0,
              lineHeight: '14px'
            }
          }}
        >
          <i className='ri-notification-2-line text-[22px]' />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        ref={ref}
        style={{ width: 480 }}
        anchorEl={anchorRef.current}
        {...(isSmallScreen
          ? {
              className: 'is-full !mbs-4 z-[1] max-bs-[550px] bs-[550px] w-[500px]',
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    padding: themeConfig.layoutPadding
                  }
                }
              ]
            }
          : { className: 'is-96 !mbs-4 z-[1] max-bs-[550px] bs-[550px] w-[500px]' })}
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}>
            <Paper className={classnames('bs-full', settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg')}>
              <ClickAwayListener onClickAway={handleClose}>
                <div className='bs-full flex flex-col '>
                  <div className='flex items-center justify-between plb-2 pli-4 is-full gap-2'>
                    <div className='flex items-center justify-center'>
                      <Typography className='bg-[#1F4E8D] w-[7px] h-[7px] rounded-full inline-block mr-[5px] shrink-0'></Typography>
                      <Typography variant='h6' className='flex-auto text-[#1F4E8D] font-semibold text-lg'>
                        Notifications 
                      </Typography>
                    </div>

                    <section className='flex items-center justify-center space-x-2'>
                      <div className='flex justify-center items-center space-x-4'>
                        {notifications.length > 0 ? (
                          <p className='text-buttonPrimary bg-[#dcf6fe] py-1 px-3 rounded-full text-sm font-semibold'>
                            {totalCount} total
                          </p>
                        ) : (
                          ''
                        )}
                      </div>

                      <CustomTooltip text='Marked All Notification' position='left' align='left'>
                        <Box>
                          {notifications.length > 0 ? (
                            <div onClick={() => readAllNotifications()} className='text-textPrimary'>
                              {readAll ? (
                                <Image
                                  src={graymark}
                                  alt='Notification-marked'
                                  className='w-[20px] h-[20px] mt-[1.5px]'
                                />
                              ) : (
                                <Image
                                  src={notificationmark}
                                  alt='Notification-marked'
                                  className='w-[20px] h-[20p mt-[1.5px]x]'
                                />
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </CustomTooltip>
                    </section>
                  </div>
                  <Divider />

                  <NotificationDropDown />

                  <Divider />
                  <div className='p-4'>
                    <CustomButton
                      onClick={() => navigateTo('/notification')}
                      fullWidth
                      variant='contained'
                      size='small'
                    >
                      View All Notifications
                    </CustomButton>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default NotificationDropdown
