import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { getStoredToken } from '@/utils/tokenSync'

export const createSocketConnection = (userId: number | null): Socket | null => {
  if (!userId) return null

  const token = getStoredToken()

  if (!token) {
    console.warn('❌ No auth token found. Cannot create socket connection.')

    return null
  }

  const socket = io('https://ws.pusherapp.com', {
    transports: ['websocket'],
    query: {
      app: '8404ce4205191bf5c60d',
      protocol: 7,
      client: 'js',
      version: '7.0.3',
      userId: userId.toString(),
      authToken: token
    }
  })

  return socket
}
