// // Next Imports
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import Image from 'next/image'

import { FormControl, InputLabel, Select, MenuItem, Grid, type SelectChangeEvent } from '@mui/material'

import classnames from 'classnames'

import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import type { Locale } from '@configs/i18n'
import type { NotificationsType } from '@components/layout/shared/NotificationsDropdown'

// // Component Imports
import NavToggle from './NavToggle'
import NavSearch from '@components/layout/shared/search'
import NotificationsDropdown from '@components/layout/shared/NotificationsDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'

import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
import { getLocalizedUrl } from '@/utils/i18n'

import { gettingRmcTenderId } from '@/services/dashboard-apis/dashboard-api'
import { setRmcTenderId } from '@/redux-store/slices/rmcOnboardingSlice'

import appLogo from '../../../../public/images/customImages/appLogo.png'
import { routesWithNavbarContent, pmaRoutes, rmcRoutes } from '@/constants'

const notifications: NotificationsType[] = [
  {
    avatarImage: '/images/avatars/2.png',
    title: 'Congratulations Flora 🎉',
    subtitle: 'Won the monthly bestseller gold badge',
    time: '1h ago',
    read: false
  },
  {
    title: 'Cecilia Becker',
    subtitle: 'Accepted your connection',
    time: '12h ago',
    read: false
  },
  {
    avatarImage: '/images/avatars/3.png',
    title: 'Bernard Woods',
    subtitle: 'You have new message from Bernard Woods',
    time: 'May 18, 8:26 AM',
    read: true
  },
  {
    avatarIcon: 'ri-bar-chart-line',
    avatarColor: 'info',
    title: 'Monthly report generated',
    subtitle: 'July month financial report is generated',
    time: 'Apr 24, 10:30 AM',
    read: true
  },
  {
    avatarText: 'MG',
    avatarColor: 'success',
    title: 'Application has been approved 🚀',
    subtitle: 'Your Meta Gadgets project application has been approved.',
    time: 'Feb 17, 12:17 PM',
    read: true
  },
  {
    avatarIcon: 'ri-mail-line',
    avatarColor: 'error',
    title: 'New message from Harry',
    subtitle: 'You have new message from Harry',
    time: 'Jan 6, 1:48 PM',
    read: true
  }
]

interface Tender {
  id: number
  name: string
}

interface TenderIdResponse {
  status: string
  message: string
  data: {
    total_count: number
    tenders: Tender[]
  }
}

const NavbarContent = () => {
  const { isBreakpointReached } = useHorizontalNav()
  const { lang: locale } = useParams()
  const pathname = usePathname()
  const dispatch = useDispatch()

  const shouldHideElements = routesWithNavbarContent.some(route => pathname.includes(route))

  const isOnboardingRoute =
    pmaRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
    rmcRoutes.some(route => pathname === route || pathname.startsWith(route))

  const [rmctenderId, setRmctenderId] = useState<string>('')
  const [tendersWithInitials, setTendersWithInitials] = useState<any[]>([])
  const [selectedTenderInitial, setSelectedTenderInitial] = useState<string>('')

  const { data: rmcTenderIDData, isLoading } = useQuery<TenderIdResponse, Error>({
    queryKey: ['rmcTenderIds'],
    queryFn: gettingRmcTenderId,
    retry: 2
  })

  useEffect(() => {
    if (rmcTenderIDData?.data?.tenders?.length) {
      const updatedTenders = rmcTenderIDData.data.tenders.map(tender => ({
        ...tender,
        initials: tender.name
          ?.split(/[-\s]/)
          .map(word => word.charAt(0))
          .join('')
          .slice(0, 2)
          .toUpperCase()
      }))

      setTendersWithInitials(updatedTenders)

      const firstTender = updatedTenders[0]

      if (firstTender) {
        setRmctenderId(firstTender.id.toString())
        setSelectedTenderInitial(firstTender.initials)
        dispatch(setRmcTenderId(firstTender.id))
      }
    }
  }, [rmcTenderIDData, dispatch])

  const handleTenderChange = (event: SelectChangeEvent) => {
    const selectedTenderId = event.target.value as string

    setRmctenderId(selectedTenderId)

    const selectedTender = tendersWithInitials.find(t => t.id === Number(selectedTenderId))

    if (selectedTender) {
      setSelectedTenderInitial(selectedTender.initials)
    }

    dispatch(setRmcTenderId(Number(selectedTenderId)))
  }

  return (
    <div
      className={classnames(
        horizontalLayoutClasses.navbarContent,
        'flex items-center justify-between gap-4',
        'is-full',
        !isOnboardingRoute && 'mt-2'
      )}
      style={
        isOnboardingRoute
          ? {
              width: '100%',
              maxWidth: 'none',
              paddingLeft: '0',
              paddingRight: '0',
              marginLeft: '0',
              marginRight: '0'
            }
          : {}
      }
    >
      <div className='flex items-center gap-4' style={isOnboardingRoute ? { marginLeft: '200px' } : {}}>
        <NavToggle />
        {!isBreakpointReached && (
          <Link href={getLocalizedUrl('/', locale as Locale)}>
            <Image src={appLogo} alt='nav Logo' className='mt-2' />
          </Link>
        )}
      </div>

      <div className='flex items-center' style={isOnboardingRoute ? { marginRight: '200px' } : {}}>
        {!shouldHideElements && (
          <div className='w-[200px]'>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size='small'>
                <InputLabel
                  id='tender-input'
                  sx={{
                    color: '#696969',
                    '&.Mui-focused': {
                      color: '#35C0ED'
                    }
                  }}
                >
                  Select Tender
                </InputLabel>
                <Select
                  labelId='tender-input'
                  id='demo-simple-select'
                  value={rmctenderId}
                  label='Select Tender'
                  onChange={handleTenderChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#696969'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#35C0ED'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#35C0ED'
                    },
                    '& .MuiSelect-select': {
                      paddingTop: '8px',
                      paddingBottom: '8px'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          color: '#35C0ED',
                          backgroundColor: '#26C6F93D',
                          '&.Mui-selected': {
                            backgroundColor: '#26C6F93D !important',
                            color: '#35C0ED'
                          },
                          '&:hover': {
                            backgroundColor: '#26C6F93D'
                          }
                        }
                      }
                    }
                  }}
                >
                  {isLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : rmcTenderIDData?.data?.tenders?.length ? (
                    rmcTenderIDData.data.tenders.map(tender => (
                      <MenuItem key={tender.id} value={tender.id}>
                        {tender.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value='' disabled>
                      No tenders available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </div>
        )}
        {!shouldHideElements && <NavSearch />}
        {!shouldHideElements && <NotificationsDropdown notifications={notifications} />}
        <UserDropdown selectedTenderInitial={selectedTenderInitial} />
      </div>
    </div>
  )
}

export default NavbarContent
