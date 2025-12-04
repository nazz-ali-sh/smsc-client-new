
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { notificationApi } from '@/services/notification-apis/notification-api'

const LIMIT = 10

export const useNotifications = (userId: number | null) => {
  const queryClient = useQueryClient()

  interface NotificationPage {
    notifications: any[] 
    nextOffset?: number
    offset?: any
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['notifications', 'list', userId],
    queryFn: async ({ pageParam = 0 }): Promise<NotificationPage> => {
      const res = await notificationApi.getNotifications({
        limit: LIMIT,
        // offset: pageParam as number
      })

      const items = res.data.notifications || []

      return {
        notifications: items,
        nextOffset: items.length === LIMIT ? (pageParam as number) + LIMIT : undefined
      }
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextOffset,
    enabled: !!userId
  })

  // Flatten pages into single array
  const notifications = data?.pages.flatMap(page => page.notifications) ?? []

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications', 'unreadCount', userId],
    queryFn: () => notificationApi.getUnreadCount().then(res => res.data.unread_count),
    enabled: !!userId
  })

  const markAsRead = useMutation({
    mutationFn: (id: number) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list', userId] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount', userId] })
    }
  })

  const markAllAsRead = useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })

  const deleteNotification = useMutation({
    mutationFn: (id: number) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list', userId] })
    }
  })

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['notifications', 'list', userId] })
    queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount', userId] })
  }

  return {
    notifications,
    hasMore: hasNextPage,
    loadMore,
    isLoadingMore: isFetchingNextPage,
    isLoading,
    unreadCount,
    totalCount: notifications.length, 

    markAsRead: (id: number) => markAsRead.mutateAsync(id),
    markAllAsRead: () => markAllAsRead.mutateAsync(),
    deleteNotification: (id: number) => deleteNotification.mutateAsync(id),

    refresh
  }
}
