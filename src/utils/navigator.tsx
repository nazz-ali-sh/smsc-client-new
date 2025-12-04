
'use client'

import { useRouter } from 'next/navigation'

export const useNavigateTo = () => {
  const router = useRouter()

  const navigateTo = (path: string, tab?: string, id?: string | number) => {
    const params = new URLSearchParams()

    if (tab) params.set('tab', tab)
    if (id) params.set('id', String(id))

    const query = params.toString()

    router.push(query ? `${path}?${query}` : path)
  }

  return navigateTo
}
