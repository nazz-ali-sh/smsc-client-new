import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function RootPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('rmc-token')?.value
  const isAuthenticated = !!token && token.length > 10

  if (isAuthenticated) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }
}
