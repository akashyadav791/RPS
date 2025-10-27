import { useState, useEffect } from 'react'
import axios from '../config/axios'

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/leaderboard')
      setLeaderboard(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch leaderboard')
      console.error('Error fetching leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return {
    leaderboard,
    loading,
    error,
    refetch: fetchLeaderboard
  }
}
