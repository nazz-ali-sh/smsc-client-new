'use client'

import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { useDispatch, useSelector } from 'react-redux'

import { useSettings } from '@core/hooks/useSettings'

import { clearTokenCookie } from '@/utils/tokenSync'
import { clearRmcData } from '@/redux-store/slices/rmcOnboardingSlice'
import { routesWithNavbarContent } from '@/constants'

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const tenderId = useSelector((state: any) => state?.rmcOnboarding?.tenderId)

  const { settings } = useSettings()

  const isOnboardingRoute = routesWithNavbarContent.some(route => pathname.includes(route))

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleSignOut = () => {
    clearTokenCookie()
    dispatch(clearRmcData())

    if (typeof window !== 'undefined') {
      localStorage.removeItem('rmc-onboarding-postcode')
    }

    setOpen(false)
    router.push('/login')
  }

  const hanldeArchive = () => {
    router.push('/archive')
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper
              elevation={settings.skin === 'bordered' ? 0 : 8}
              {...(settings.skin === 'bordered' && { className: 'border' })}
            >
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  {!isOnboardingRoute && (
                    <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/my-accounts')}>
                      <Typography color='text.primary'>My Account</Typography>
                    </MenuItem>
                  )}
                  {!isOnboardingRoute && tenderId && (
                    <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, '/set-availability')}>
                      <Typography color='text.primary'>Set Availability </Typography>
                    </MenuItem>
                  )}
                  {!isOnboardingRoute && tenderId && (
                    <MenuItem className='gap-3 pli-4' onClick={hanldeArchive}>
                      <Typography color='text.primary'>Archive</Typography>
                    </MenuItem>
                  )}
                  <MenuItem className='gap-3 pli-4' onClick={handleSignOut}>
                    <Typography color='text.primary'>Sign Out</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
