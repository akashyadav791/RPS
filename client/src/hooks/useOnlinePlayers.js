import { useState, useEffect, useCallback } from 'react'
import axios from '../config/axios'
import { useAuth } from '../contexts/AuthContext'

export const useOnlinePlayers = () => {
  const [onlineCount, setOnlineCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()
  const [sessionId, setSessionId] = useState(null)

  // Send heartbeat to update session
  const sendHeartbeat = useCallback(async () => {
    if (!currentUser) return

    try {
      const response = await axios.post('/api/sessions/session/heartbeat', {
        userId: currentUser.uid,
        displayName: currentUser.displayName || 'Anonymous',
        sessionId
      })
      
      if (!sessionId && response.data.sessionId) {
        setSessionId(response.data.sessionId)
      }
    } catch (error) {
      console.error('Error sending heartbeat:', error)
    }
  }, [currentUser, sessionId])

  // Fetch online players count
  const fetchOnlineCount = useCallback(async () => {
    try {
      const response = await axios.get('/api/sessions/online-count')
      setOnlineCount(response.data.onlinePlayers)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching online count:', error)
      setLoading(false)
    }
  }, [])

  // Send logout signal
  const logout = useCallback(async () => {
    if (!currentUser) return

    try {
      await axios.post('/api/sessions/session/logout', {
        userId: currentUser.uid
      })
    } catch (error) {
      console.error('Error logging out session:', error)
    }
  }, [currentUser])

  useEffect(() => {
    // Fetch online count immediately
    fetchOnlineCount()

    // Update online count every 30 seconds
    const countInterval = setInterval(fetchOnlineCount, 30000)

    // Send heartbeat every 2 minutes if user is logged in
    let heartbeatInterval
    if (currentUser) {
      sendHeartbeat() // Send immediately
      heartbeatInterval = setInterval(sendHeartbeat, 120000) // Every 2 minutes
    }

    // Cleanup on unmount
    return () => {
      clearInterval(countInterval)
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval)
      }
      if (currentUser) {
        logout()
      }
    }
  }, [currentUser, fetchOnlineCount, sendHeartbeat, logout])

  return {
    onlineCount,
    loading,
    refetch: fetchOnlineCount
  }
}
