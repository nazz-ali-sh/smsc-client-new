import { rmcRoutes as importedRmcRoutes } from '@/constants'

export const rmcRoutes = importedRmcRoutes

export const getOnboardingRoute = (step?: number): string => {
  switch (step) {
    case 3:
      return '/postcode'
    case 4:
      return '/budget'
    case 5:
      return '/leaseholder'
    case 6:
      return '/priorities'
    case 7:
      return '/open'
    default:
      return '/onboarding'
  }
}
