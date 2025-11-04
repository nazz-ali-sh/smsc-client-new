import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
  onboardingPublicRoutes,
  PMA_PORTAL,
  PMA_USER,
  protectedRoutes,
  publicRoutes,
  RMC_PORTAL,
  RMC_USER
} from './constants'

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes?.some(route => path?.startsWith(route))
  const isPublicRoute = publicRoutes?.includes(path)
  const isOnboardingRoute = onboardingPublicRoutes?.some(route => path?.startsWith(route))

  const rmcToken = req.cookies.get('rmc-token')?.value
  const pmaToken = req.cookies.get('pma-token')?.value
  const userType = req.cookies.get('user_type')?.value
  const portalType = process.env.NEXT_PUBLIC_SMSC_PORTAL

  let isValidAuth = false
  let token = null

  if (portalType === PMA_PORTAL && userType === PMA_USER && pmaToken) {
    isValidAuth = true
    token = pmaToken
  } else if (portalType === RMC_PORTAL && userType === RMC_USER && rmcToken) {
    isValidAuth = true
    token = rmcToken
  } else if (!portalType || portalType === RMC_PORTAL) {
    if (userType === RMC_USER && rmcToken) {
      isValidAuth = true
      token = rmcToken
    } else if (rmcToken && !userType) {
      isValidAuth = true
      token = rmcToken
    }
  }

  const isAuthenticated = isValidAuth && !!token && token.length > 10

  console.log('🔍 Middleware check:', {
    path,
    portalType,
    userType,
    rmcToken: rmcToken ? `${rmcToken.substring(0, 10)}...` : 'none',
    pmaToken: pmaToken ? `${pmaToken.substring(0, 10)}...` : 'none',
    token: token ? `${token.substring(0, 10)}...` : 'none',
    isValidAuth,
    isAuthenticated,
    isProtectedRoute,
    isPublicRoute,
    isOnboardingRoute
  })

  if ((rmcToken || pmaToken) && !isValidAuth && isProtectedRoute) {
    const loginUrl = new URL('/login', req.url)
    const response = NextResponse.redirect(loginUrl)

    response.cookies.set('rmc-token', '', { expires: new Date(0), path: '/' })
    response.cookies.set('pma-token', '', { expires: new Date(0), path: '/' })
    response.cookies.set('user_type', '', { expires: new Date(0), path: '/' })

    return response
  }

  // Only redirect to dashboard if user tries to access initial onboarding routes
  // Allow them to continue if they're already in the onboarding flow
  if (isAuthenticated && (path === '/onboarding' || path === '/director' || path === '/company')) {
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
