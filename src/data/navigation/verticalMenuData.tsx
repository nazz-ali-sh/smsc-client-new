// Type Imports
import type { VerticalMenuDataType, VerticalMenuItemDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'ri-home-smile-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Tender Information',
    href: '/tender-information-update',
    icon: 'ri-mail-open-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Tender Results',
    href: '/tender-result',
    icon: 'ri-database-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Shortlisted Agents',
    href: '/shortlist-agent',
    icon: 'ri-pantone-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Invites',
    href: '/rmc-calendar',
    icon: 'ri-file-list-2-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Chats',
    href: '/chats',
    icon: 'ri-pages-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Final Selection',
    href: '/final-selection',
    icon: 'ri-bar-chart-2-line'
  } as VerticalMenuItemDataType,
  {
    label: 'Insurance',
    href: '/insurance',
    icon: 'ri-bar-chart-2-line'
  } as VerticalMenuItemDataType
]

export default verticalMenuData
