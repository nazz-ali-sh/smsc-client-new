export function setTokenCookie(token: string): void {
  if (typeof document === 'undefined') return

  const expires = new Date()

  expires.setDate(expires.getDate() + 7)

  const cookieString = `rmc-token=${token}; expires=${expires.toUTCString()}; path=/;`

  document.cookie = cookieString

  console.log('🍪 Token cookie set:', { token, expires: expires.toUTCString() })
}

export function setPmaTokenCookie(token: string): void {
  if (typeof document === 'undefined') return

  const expires = new Date()

  expires.setDate(expires.getDate() + 7)

  const cookieString = `pma-token=${token}; expires=${expires.toUTCString()}; path=/;`

  document.cookie = cookieString

  console.log('🍪 PMA Token cookie set:', { token, expires: expires.toUTCString() })
}

export function clearTokenCookie(): void {
  if (typeof document === 'undefined') return

  document.cookie = 'rmc-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export function clearPmaTokenCookie(): void {
  if (typeof document === 'undefined') return

  document.cookie = 'pma-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export function setUserTypeCookie(userType: string): void {
  if (typeof document === 'undefined') return

  const expires = new Date()

  expires.setDate(expires.getDate() + 7)

  const cookieString = `user_type=${userType}; expires=${expires.toUTCString()}; path=/;`

  document.cookie = cookieString
}

export function clearUserTypeCookie(): void {
  if (typeof document === 'undefined') return

  document.cookie = 'user_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export function clearAllTokenCookies(): void {
  clearTokenCookie()
  clearPmaTokenCookie()
  clearUserTypeCookie()
}

export function clearAllTokens(): void {
  clearTokenCookie()
  clearPmaTokenCookie()
  clearUserTypeCookie()

  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_type')
  }
}

export function getStoredToken(): string | null {
  if (typeof document === 'undefined') return null

  const userType = localStorage.getItem('user_type')
  const cookies = document.cookie.split(';')

  if (userType === 'pma_user') {
    const pmaTokenCookie = cookies.find(cookie => cookie.trim().startsWith('pma-token='))

    return pmaTokenCookie ? pmaTokenCookie.split('=')[1] : null
  }

  const rmcTokenCookie = cookies.find(cookie => cookie.trim().startsWith('rmc-token='))

  return rmcTokenCookie ? rmcTokenCookie.split('=')[1] : null
}

export function getUserType(): string | null {
  if (typeof window === 'undefined') return null

  return localStorage.getItem('user_type')
}

export function clearAllAndRedirectToLogin(): void {
  clearAllTokens()

  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

export function storeToken(token: string, userType?: string): void {
  if (userType === 'pma_user') {
    setPmaTokenCookie(token)
  } else {
    setTokenCookie(token)
  }

  if (userType) {
    setUserTypeCookie(userType)

    if (typeof window !== 'undefined') {
      localStorage.setItem('user_type', userType)
    }
  }
}

export function storePmaToken(token: string): void {
  setPmaTokenCookie(token)

  setUserTypeCookie('pma_user')

  if (typeof window !== 'undefined') {
    localStorage.setItem('user_type', 'pma_user')
  }
}
