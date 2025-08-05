export interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  color: string
  type: 'site-visit' | 'online-call'
}

export interface MetricCard {
  title: string
  value: string | number
  icon: string
  color: string
  subtitle?: string
}

export interface UserInfo {
  userId: string
  activeOffices: number
  activeUsers: number
  subUserVisibility: boolean
}

export interface ActivityMetric {
  title: string
  value: string
  icon: string
  color: string
}

// Static data for the calendar
export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: '12:56p Design Review',
    start: '2025-07-12T12:56:00',
    color: '#2196F3',
    type: 'online-call'
  },
  {
    id: '2',
    title: 'Meeting with c',
    start: '2025-07-20T10:00:00',
    color: '#4CAF50',
    type: 'site-visit'
  }
]

export const overviewMetrics: MetricCard[] = [
  {
    title: 'Live Tenders',
    value: 30,
    icon: 'laptop',
    color: '#9C27B0',
    subtitle: 'Your Tender Progress so far'
  },
  {
    title: 'You have received',
    value: '8 Responses',
    icon: 'lightbulb',
    color: '#2196F3'
  },
  {
    title: 'Won Tenders',
    value: 2,
    icon: 'award',
    color: '#FF9800'
  }
]

export const userInfo: UserInfo = {
  userId: 'PMA1XXXX',
  activeOffices: 5,
  activeUsers: 5,
  subUserVisibility: true
}

export const activityMetrics: ActivityMetric[] = [
  {
    title: 'Schedule Calls',
    value: '27 Schedule Calls',
    icon: 'user-headset',
    color: '#35C0ED'
  },
  {
    title: 'Complete Calls',
    value: '3 Complete Calls',
    icon: 'phone',
    color: '#72E128'
  },
  {
    title: 'Schedule Visits',
    value: '6 Schedule Visits',
    icon: 'map-pin',
    color: '#35C0ED'
  },
  {
    title: 'Successful visits',
    value: '10 Successful visits',
    icon: 'map-folded',
    color: '#72E128'
  }
]

export const miniCalendarEvents = [
  { date: '2021-12-06', color: '#E3F2FD' },
  { date: '2021-12-09', color: '#E8F5E8' },
  { date: '2021-12-14', color: '#E3F2FD' },
  { date: '2021-12-14', color: '#2196F3' }
]
