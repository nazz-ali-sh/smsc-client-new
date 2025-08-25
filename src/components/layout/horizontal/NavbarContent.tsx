// // Next Imports
import { useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import Image from 'next/image'

import { FormControl, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material'

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

import { setTenderId } from '../../../redux-store/slices/userSlice'
import logo3 from '../../../../public/images/customImages/logofinal4.png'

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
  const dispatch = useDispatch()

  const { isBreakpointReached } = useHorizontalNav()
  const { lang: locale } = useParams()

  const [rmctenderId, setRmcTenderId] = useState<number | ''>('')

  const handleTenderChange = (event: any) => {
    debugger
    const newTenderId = event.target.value as number

    dispatch(setTenderId(newTenderId))

    setRmcTenderId(newTenderId)
  }

  const { data: rmcTenderIDData, isLoading } = useQuery<TenderIdResponse, Error>({
    queryKey: ['rmcTenderIds'],
    queryFn: gettingRmcTenderId
  })

  return (
    <div
      className={classnames(
        horizontalLayoutClasses.navbarContent,
        'flex items-center justify-between gap-4 mt-2 is-full'
      )}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
        {!isBreakpointReached && (
          <Link href={getLocalizedUrl('/', locale as Locale)}>
            <Image src={logo3} alt='nav Logo' className='mt-2' />
          </Link>
        )}
      </div>

      <div className='flex items-center'>
        <Button
          variant='contained'
          startIcon={<i className='ri-add-line text-[20px]'></i>}
          sx={{
            backgroundColor: 'customColors.ligthBlue',
            paddingX: '20px',
            marginRight: '20px',
            '&:hover': {
              backgroundColor: 'customColors.ligthBlue'
            }
          }}
        >
          Launch New Tender
        </Button>
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
              >
                {isLoading ? (
                  <div className='text-center'> Loading.... </div>
                ) : rmcTenderIDData?.data?.tenders?.length ? (
                  rmcTenderIDData?.data?.tenders?.map(tender => (
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
        <NavSearch />
        <NotificationsDropdown notifications={notifications} />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
