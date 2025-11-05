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

import NavToggle from './NavToggle'
import NavSearch from '@components/layout/shared/search'
import NotificationsDropdown from '@components/layout/shared/NotificationsDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

import useHorizontalNav from '@menu/hooks/useHorizontalNav'

import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
import { getLocalizedUrl } from '@/utils/i18n'

import { gettingRmcTenderId } from '@/services/dashboard-apis/dashboard-api'
import { setRmcTenderId, setRmcTenderName } from '@/redux-store/slices/rmcOnboardingSlice'

import appLogo from '../../../../public/images/customImages/appLogo.png'
import { routesWithNavbarContent, pmaRoutes, rmcRoutes } from '@/constants'
import { isPmaPortalAndUser } from '@/utils/portalHelper'
import { getUserType } from '@/utils/tokenSync'
import { notifications } from '@/constants/headerOptions'
import { useMyAccount } from '@/hooks/useMyAccount'

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

  const userType = getUserType()
  const isPmaUser = isPmaPortalAndUser(userType)

  const { data: accountData } = useMyAccount()

  const user = accountData?.user?.name

  const shouldHideElements = routesWithNavbarContent.some(route => pathname.includes(route))

  const isOnboardingRoute =
    pmaRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
    rmcRoutes.some(route => pathname === route || pathname.startsWith(route))

  const [rmctenderId, setRmctenderId] = useState<string>('')

  const { data: rmcTenderIDData, isLoading } = useQuery<TenderIdResponse, Error>({
    queryKey: ['rmcTenderIds'],
    queryFn: gettingRmcTenderId,
    retry: 2
  })

  useEffect(() => {
    if (rmcTenderIDData?.data?.tenders?.length) {
      const firstTender = rmcTenderIDData.data.tenders[0]

      dispatch(setRmcTenderName(firstTender?.name))

      if (firstTender) {
        setRmctenderId(firstTender.id.toString())
        dispatch(setRmcTenderId(firstTender.id))
      }
    }
  }, [rmcTenderIDData, dispatch])

  const handleTenderChange = (event: SelectChangeEvent) => {
    const selectedTenderId = event.target.value as string

    setRmctenderId(selectedTenderId)
    dispatch(setRmcTenderId(Number(selectedTenderId)))
  }

  const getUserInitials = (name: string | undefined): string => {
    if (!name) return ''

    const parts = name.trim().split(/\s+/)
    const firstName = parts[0] || ''
    const lastName = parts.length > 1 ? parts[parts.length - 1] : ''

    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  }

  const userInitials = getUserInitials(user)

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
        {!shouldHideElements && !isPmaUser && (
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
        {!shouldHideElements && !isPmaUser && <NotificationsDropdown notifications={notifications} />}
        <UserDropdown selectedTenderInitial={userInitials} />
      </div>
    </div>
  )
}

export default NavbarContent
