import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/postcode',
  '/address',
  '/details',
  '/budget',
  '/leaseholder',
  '/buildings',
  '/blocks',
  '/spaces',
  '/priorities',
  '/open',
  '/tender-information',
  '/shortlist-agent',
  '/calendar',
  '/site-visits',
  '/video-calls',
  '/chats',
  '/final-selection',
  '/archive',
  '/set-availability',
  '/account',
  '/evaluation-matrix',
  '/insurance',
  '/pma-calendar',
  '/branch-management',
  '/user-management',
  '/account-detail',
  '/tender-result',
  '/locationcode',
  'bussiness-profile',
  '/google-reviews',
  '/otp-verification',
  '/pinlocation',
  '/reviews-form',
  '/tenders-notification',
  '/trustpilot-form',
  '/trustpilot-reviews',
  '/verify-otp'
]

const publicRoutes = ['/', '/login', '/forgot-password', '/reset-password']

const onboardingPublicRoutes = [
  '/onboarding',
  '/director',
  '/verification',
  '/otp',
  '/resident',
  '/rtm',
  '/questions',
  '/second',
  '/third',
  '/four',
  '/five',
  '/otp-verification',
  '/verify-otp',
  '/google-reviews',
  '/trustpilot-reviews',
  '/reviews-form',
  '/company',
  '/company-details',
  '/business-profile',
  '/tenders-notification',
  '/email-notification',
  '/management',
  '/trustpilot-form',
  '/location',
  '/location-form',
  '/locationcode',
  '/pinlocation'
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes?.some(route => path?.startsWith(route))
  const isPublicRoute = publicRoutes?.includes(path)
  const isOnboardingRoute = onboardingPublicRoutes?.some(route => path?.startsWith(route))

  const rmcToken = req.cookies.get('rmc-token')?.value
  const pmaToken = req.cookies.get('pma-token')?.value
  const token = rmcToken || pmaToken
  const isAuthenticated = !!token && token.length > 10

  console.log('🔍 Middleware check:', {
    path,
    rmcToken: rmcToken ? `${rmcToken.substring(0, 10)}...` : 'none',
    pmaToken: pmaToken ? `${pmaToken.substring(0, 10)}...` : 'none',
    token: token ? `${token.substring(0, 10)}...` : 'none',
    isAuthenticated,
    isProtectedRoute,
    isPublicRoute,
    isOnboardingRoute
  })

  // Only redirect to dashboard if user tries to access initial onboarding routes
  // Allow them to continue if they're already in the onboarding flow
  if (isAuthenticated && (path === '/onboarding' || path === '/director')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow onboarding routes to be accessed without authentication
  if (isOnboardingRoute) {
    return NextResponse.next()
  }

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', req.url)

    return NextResponse.redirect(loginUrl)
  }

  if (isPublicRoute && isAuthenticated && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (path === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    } else {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)']
}
