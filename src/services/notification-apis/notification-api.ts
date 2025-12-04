import axiosClient from '@/utils/axiosInstance'
import type { NotificationApiParams, NotificationResponse, UnreadCountResponse } from '@/types/notification'

export const notificationApi = {
  
  getNotifications: async (params?: NotificationApiParams): Promise<NotificationResponse> => {
    try {
      const response = await axiosClient.get('/notifications', {
        params: {
          limit: params?.limit || 10,

          // source: params?.source || 'database',
          unread_only: params?.unread_only || false
        }
      })

      return response.data
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      throw error
    }
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    try {
      const response = await axiosClient.get('/notifications/unread-count')

      return response.data
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
      throw error
    }
  },

  markAsRead: async (notificationId: number): Promise<any> => {
    try {
      const response = await axiosClient.post(`/notifications/${notificationId}/mark-read`)

      return response.data
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
      throw error
    }
  },

  markAllAsRead: async (): Promise<any> => {
    try {
      const response = await axiosClient.post(`/notifications/mark-all-read`)

      return response.data
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
      throw error
    }
  },

  deleteNotification: async (notificationId: number): Promise<any> => {
    try {
      const response = await axiosClient.delete(`notifications/${notificationId}`)

      return response.data
    } catch (error) {
      console.error('Failed to delete notification:', error)
      throw error
    }
  },

  createTestNotification: async (data: {
    event_code: string
    title: string
    message: string
    key_id?: number
    data?: Record<string, any>
  }): Promise<any> => {
    try {
      const response = await axiosClient.post('/rmc/notifications/test', data)

      return response.data
    } catch (error) {
      console.error('Failed to create test notification:', error)
      throw error
    }
  }
}
