import Button from '@mui/material/Button'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

import LayoutWrapper from '@layouts/LayoutWrapper'

import HorizontalLayout from '@layouts/HorizontalLayout'

import Providers from '@components/Providers'
import ScrollToTop from '@core/components/scroll-to-top'
import RetenderNotificationWrapper from '@/components/layout/horizontal/RetenderNotificationWrapper'
import ProfileCompletionNotificationWrapper from '@/components/layout/horizontal/ProfileCompletionNotificationWrapper'

import { getSystemMode } from '@core/utils/serverHelpers'
import Header from '@/components/layout/horizontal/Header'
import HorizontalFooter from '@components/layout/horizontal/Footer'

import { getDictionary } from '@/utils/getDictionary'

const Layout = async ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  const direction = 'ltr'
  const systemMode = getSystemMode()
  const dictionary = await getDictionary(params.lang)

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        horizontalLayout={
          <HorizontalLayout header={<Header dictionary={dictionary} />} footer={<HorizontalFooter />}>
            <ProfileCompletionNotificationWrapper />
            <RetenderNotificationWrapper />
            {children}
          </HorizontalLayout>
        }
      />
      <ScrollToTop className='mui-fixed'>
        <Button
          variant='contained'
          className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center !bg-[#6AC2ED] hover:!bg-[#6AC2ED]'
        >
          <i className='ri-arrow-up-line' />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

export default Layout
