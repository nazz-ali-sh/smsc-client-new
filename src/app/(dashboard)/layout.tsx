// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'

import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import Providers from '@components/Providers'
import ScrollToTop from '@core/components/scroll-to-top'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'
import HorizontalFooter from '@components/layout/horizontal/Footer'

const Layout = async ({ children }: ChildrenType & { params: { lang: Locale } }) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        horizontalLayout={<HorizontalLayout footer={<HorizontalFooter />}>{children}</HorizontalLayout>}
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
