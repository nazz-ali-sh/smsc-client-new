import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/rmc-onboarding-postcode',
  '/rmc-onboarding-address',
  '/rmc-onboarding-details',
  '/rmc-onboarding-budget',
  '/rmc-onboarding-leaseholder',
  '/rmc-onboarding-buildings',
  '/rmc-onboarding-blocks',
  '/rmc-onboarding-spaces',
  '/rmc-onboarding-priorities',
  '/rmc-onboarding-open',
  '/tender-information-update',
  '/tender-information',
  '/shortlist-agent',
  '/rmc-calendar',
  '/chats',
  '/final-selection',
  '/archive'
]

const publicRoutes = ['/', '/login', '/forgot-password', '/reset-password']

const onboardingPublicRoutes = [
  '/rmc-onboarding',
  '/rmc-onboarding-director',
  '/rmc-onboarding-verification',
  '/rmc-onboarding-otp',
  'rmc-onboarding-resident',
  '/rmc-onboarding-rtm',
  '/rmc-onboarding-questions',
  '/rmc-onboarding-second',
  '/rmc-onboarding-third',
  '/rmc-onboarding-four',
  '/rmc-onboarding-five'
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes?.some(route => path?.startsWith(route))
  const isPublicRoute = publicRoutes?.includes(path)
  const isOnboardingRoute = onboardingPublicRoutes?.some(route => path?.startsWith(route))

  const token = req.cookies.get('rmc-token')?.value
  const isAuthenticated = !!token && token.length > 10

  console.log('🔍 Middleware check:', {
    path,
    token: token ? `${token.substring(0, 10)}...` : 'none',
    isAuthenticated,
    isProtectedRoute,
    isPublicRoute,
    isOnboardingRoute
  })

  // Only redirect to dashboard if user tries to access initial onboarding routes
  // Allow them to continue if they're already in the onboarding flow
  if (isAuthenticated && (path === '/rmc-onboarding' || path === '/rmc-onboarding-director')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
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
