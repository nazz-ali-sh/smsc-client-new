// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'ri-information-line'
  },
  {
    label: 'PMA Calendar',
    href: '/pma-calendar',
    icon: 'ri-calendar-line'
  },
  {
    label: 'Final Selection',
    href: '/final-selection',
    icon: 'ri-check-double-line'
  }

  // {
  //   label: 'TenderCreation',
  //   href: '/pre-funnel-onboarding',
  //   icon: 'ri-information-line'
  // }
]

export default verticalMenuData
