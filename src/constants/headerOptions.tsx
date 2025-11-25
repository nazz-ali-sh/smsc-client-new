import type { NotificationsType } from '@/components/layout/shared/NotificationsDropdown'

export type MenuItem = {
  image: JSX.Element
  menuItem: string
  href?: string
  alwaysEnabled: boolean
  isInvite?: boolean
  isMyAccount?: boolean
}

export const rmcMenuData: MenuItem[] = [
  {
    image: <i className='ri-home-smile-line'></i>,
    menuItem: 'Dashboard',
    href: '/dashboard',
    alwaysEnabled: true
  },
  {
    image: <i className='ri-mail-open-line'></i>,
    menuItem: 'Tender Information',
    href: '/tender-information',
    alwaysEnabled: false
  },
  {
    image: <i className='ri-database-line'></i>,
    menuItem: 'Tender Replies',
    href: '/tender-result',
    alwaysEnabled: false
  },
  {
    image: <i className='ri-pantone-line'></i>,
    menuItem: 'Shortlisted Agents',
    href: '/shortlist-agent',
    alwaysEnabled: false
  },
  {
    image: <i className='ri-file-list-2-line'></i>,
    menuItem: 'Invites',

    // href: '/calendar',
    alwaysEnabled: false,
    isInvite: true
  },
  {
    image: <i className='ri-pages-line'></i>,
    menuItem: 'Chats',
    href: '/chats',
    alwaysEnabled: false
  },
  {
    image: <i className='ri-bar-chart-2-line'></i>,
    menuItem: 'Final Selection',
    href: '/final-selection',
    alwaysEnabled: false
  },
  {
    image: <i className='ri-bar-chart-2-line'></i>,
    menuItem: 'Insurance',
    href: '/insurance',
    alwaysEnabled: true
  }
]

export const pmaMenuData: MenuItem[] = [
  {
    image: <i className='ri-home-smile-line'></i>,
    menuItem: 'Dashboard',
    href: '/dashboard',
    alwaysEnabled: true
  },
  {
    image: <i className='ri-file-list-line'></i>,
    menuItem: 'Tenders',
    href: '/tenders',
    alwaysEnabled: true
  },
  {
    image: <i className='ri-pantone-line'></i>,
    menuItem: 'Shortlisted',
    href: '/shortlisted',
    alwaysEnabled: true
  },
  {
    image: <i className='ri-file-list-2-line'></i>,
    menuItem: 'Invites',
    alwaysEnabled: true,
    isInvite: true
  },
  {
    image: <i className='ri-pages-line'></i>,
    menuItem: 'Chats',
    href: '/chats',
    alwaysEnabled: true
  },
  {
    image: <i className='ri-file-text-line'></i>,
    menuItem: 'Invoices',
    href: '/invoices',
    alwaysEnabled: true
  },
  {
    image: <i className='ri-user-line'></i>,
    menuItem: 'My Account',
    href: '/profile',
    alwaysEnabled: true
  }
]

export const notifications: NotificationsType[] = [
  {
    avatarImage: '/images/avatars/2.png',
    title: 'Congratulations Flora 🎉',
    subtitle: 'Won the monthly bestseller gold badge',
    time: '1h ago',
    read: false
  },
  {
    title: 'Cecilia Becker',
    subtitle: 'Accepted your connection',
    time: '12h ago',
    read: false
  },
  {
    avatarImage: '/images/avatars/3.png',
    title: 'Bernard Woods',
    subtitle: 'You have new message from Bernard Woods',
    time: 'May 18, 8:26 AM',
    read: true
  },
  {
    avatarIcon: 'ri-bar-chart-line',
    avatarColor: 'info',
    title: 'Monthly report generated',
    subtitle: 'July month financial report is generated',
    time: 'Apr 24, 10:30 AM',
    read: true
  },
  {
    avatarText: 'MG',
    avatarColor: 'success',
    title: 'Application has been approved 🚀',
    subtitle: 'Your Meta Gadgets project application has been approved.',
    time: 'Feb 17, 12:17 PM',
    read: true
  },
  {
    avatarIcon: 'ri-mail-line',
    avatarColor: 'error',
    title: 'New message from Harry',
    subtitle: 'You have new message from Harry',
    time: 'Jan 6, 1:48 PM',
    read: true
  }
]
