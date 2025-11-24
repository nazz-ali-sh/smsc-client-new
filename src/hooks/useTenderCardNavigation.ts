import { useRouter } from 'next/navigation'

export const useTenderCardNavigation = () => {
  const router = useRouter()

  const handleCardNavigation = (key: string) => {
    switch (key) {
      case 'live_tenders':
        router.push('/tenders')
        break
      case 'submitted_tenders':
        router.push('/tenders?active=appointment')
        break
      case 'shortlisted_tenders':
        router.push('/shortlisted')
        break
      case 'video_call':
        router.push('/video-calls')
        break
      case 'site_visit':
        router.push('/site-visits')
        break
      case 'appointed':
        router.push('/tenders?active=date_registered')
        break
      case 'closed_tenders':
        router.push('/tenders?active=closed')
        break
      case 'not_appointed':
        router.push('/invoices')
        break
      default:
        break
    }
  }

  const handleSliderNavigation = (slideId: number) => {
    switch (slideId) {
      case 1: 
        router.push('/tenders?active=date_registered')
        break
      case 2:
        router.push('/tenders?active=appointment')
        break
      case 3: 
        router.push('/tenders?active=shortlisted')
        break
      default:
        break
    }
  }

  return { handleCardNavigation, handleSliderNavigation }
}
