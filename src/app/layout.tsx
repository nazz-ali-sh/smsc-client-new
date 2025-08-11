// Third-party Imports
'use client'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { Inter } from 'next/font/google'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Next.js Font Imports

// google map instance
import { QueryClientProvider } from '@tanstack/react-query'

import { GoogleMapProvider } from '@/providers/google-map-provider'

// Type Imports
import type { ChildrenType } from '@core/types'
import ReduxProvider from '@/redux-store/ReduxProvider'
import queryClient from '../libs/react-query-client'

import '@/app/globals.css'

import '@assets/iconify-icons/generated-icons.css'

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter'
})

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  const googleMapsApiKey = process.env.NEXT_PUBLIC_Maps_API_KEY || ''

  return (
    <html id='__next' lang='en' dir={direction} className={inter.variable}>
      <head>
        <title>SMSC</title>
        <meta name='description' content='SMSC - Save My Service Charge Application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <meta name='theme-color' content='#35C0ED' />
      </head>
      <body className={`flex is-full min-bs-full flex-auto flex-col ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          {/* <Hydrate state={pageProps.dehydratedState}> */}
          <ReduxProvider>
            <GoogleMapProvider apiKey={googleMapsApiKey}>
              {children}
              <ToastContainer position='top-center' autoClose={3000} />
            </GoogleMapProvider>
          </ReduxProvider>
          {/* </Hydrate> */}
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
