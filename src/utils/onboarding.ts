export const getOnboardingRoute = (step?: number): string => {
  switch (step) {
    case 3:
      return '/rmc-onboarding-postcode'
    case 4:
      return '/rmc-onboarding-budget'
    case 5:
      return '/rmc-onboarding-leaseholder'
    case 6:
      return '/rmc-onboarding-priorities'
    case 7:
      return '/rmc-onboarding-open'
    default:
      return '/rmc-onboarding'
  }
}
