export interface Notification {
  [x: string]: any
  id: number
  title: string
  message: string
  event_code: string
  event_title: string
  key_id?: number
  data?: Record<string, any>
  created_at: string
  read_at: string | null
  totalNotification: number | null
}

export interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  totalCount: number
  loading: boolean
  error: string | null
}

export interface NotificationResponse {
  success: boolean
  data: {
    notifications: Notification[]
    total: number
    unread_count: number
    source: string
    meta: {
      version: string
      timestamp: string
    }
  }
}

export interface UnreadCountResponse {
  success: boolean
  data: {
    unread_count: number
  }
  meta: {
    version: string
    timestamp: string
  }
}

export interface NotificationApiParams {
  limit?: number
  source?: 'redis' | 'database'
  unread_only?: boolean
  page?: number
}
