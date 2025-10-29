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

export function clearAllTokenCookies(): void {
  clearTokenCookie()
  clearPmaTokenCookie()
}

export function storeToken(token: string): void {
  setTokenCookie(token)
}

export function storePmaToken(token: string): void {
  setPmaTokenCookie(token)
}
