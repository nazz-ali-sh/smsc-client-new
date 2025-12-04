import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { Notification, NotificationState } from '@/types/notification'

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  totalCount: 0,
  loading: false,
  error: null
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Set all notifications (initial load)
    setNotifications: (state, action: PayloadAction<{ notifications: Notification[]; totalCount: number }>) => {
      state.notifications = action.payload.notifications
      state.totalCount = action.payload.totalCount
      state.unreadCount = action.payload.notifications.filter(n => !n.read_at).length
      state.error = null
    },

    // Add a single new notification at the top
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.read_at) state.unreadCount += 1
      state.totalCount += 1
    },

    // Append notifications at the end (for infinite scroll)
    appendNotifications: (state, action: PayloadAction<{ notifications: Notification[]; totalCount?: number }>) => {
      state.notifications = [...state.notifications, ...action.payload.notifications]
      state.unreadCount += action.payload.notifications.filter(n => !n.read_at).length
      if (action.payload.totalCount !== undefined) state.totalCount = action.payload.totalCount
    },

    // Update a single notification
    updateNotification: (state, action: PayloadAction<Notification>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload.id)

      if (index !== -1) {
        const wasUnread = !state.notifications[index].read_at

        state.notifications[index] = { ...state.notifications[index], ...action.payload }

        // Update unread count if notification was unread and now is read
        if (wasUnread && action.payload.read_at) {
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
      }
    },

    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload
    },

    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },

    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(n => n.id === action.payload)

      if (notification && !notification.read_at) {
        notification.read_at = new Date().toISOString()
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },

    markAllAsRead: state => {
      state.notifications.forEach(n => {
        if (!n.read_at) n.read_at = new Date().toISOString()
      })
      state.unreadCount = 0
    },

    removeNotification: (state, action: PayloadAction<number>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload)

      if (index !== -1) {
        const wasUnread = !state.notifications[index].read_at

        state.notifications.splice(index, 1)
        if (wasUnread) state.unreadCount = Math.max(0, state.unreadCount - 1)
        state.totalCount = Math.max(0, state.totalCount - 1)
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    clearNotifications: state => {
      state.notifications = []
      state.unreadCount = 0
      state.totalCount = 0
      state.error = null
    }
  }
})

export const {
  setNotifications,
  addNotification,
  appendNotifications,
  updateNotification,
  setUnreadCount,
  setTotalCount,
  markAsRead,
  markAllAsRead,
  removeNotification,
  setLoading,
  setError,
  clearNotifications
} = notificationSlice.actions

export default notificationSlice.reducer

export const selectNotifications = (state: { notifications: NotificationState }) => state.notifications.notifications
export const selectUnreadCount = (state: { notifications: NotificationState }) => state.notifications.unreadCount
export const selectTotalCount = (state: { notifications: NotificationState }) => state.notifications.totalCount
export const selectNotificationsLoading = (state: { notifications: NotificationState }) => state.notifications.loading
export const selectNotificationsError = (state: { notifications: NotificationState }) => state.notifications.error
