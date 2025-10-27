import { useState, useEffect } from 'react'
import axios from '../config/axios'
import { useAuth } from '../contexts/AuthContext'

export const useGameHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentUser } = useAuth()

  const fetchHistory = async () => {
    if (!currentUser) return
    
    try {
      setLoading(true)
      const response = await axios.get(`/api/games/history/${currentUser.uid}`)
      setHistory(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch game history')
      console.error('Error fetching history:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [currentUser])

  return {
    history,
    loading,
    error,
    refetch: fetchHistory
  }
}
