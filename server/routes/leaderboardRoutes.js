import express from 'express'
import UserStats from '../models/UserStats.js'

const router = express.Router()

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100
    const sortBy = req.query.sortBy || 'wins' // wins, totalGames, winRate

    let sortCriteria = {}
    
    switch (sortBy) {
      case 'totalGames':
        sortCriteria = { 'stats.totalGames': -1 }
        break
      case 'winRate':
        sortCriteria = { 'stats.wins': -1, 'stats.totalGames': -1 }
        break
      case 'wins':
      default:
        sortCriteria = { 'stats.wins': -1 }
        break
    }

    const leaderboard = await UserStats.find()
      .sort(sortCriteria)
      .limit(limit)
      .select('userId displayName email stats lastPlayed')

    // Calculate win rates and format response
    const formattedLeaderboard = leaderboard.map(user => ({
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      totalGames: user.stats.totalGames,
      wins: user.stats.wins,
      losses: user.stats.losses,
      draws: user.stats.draws,
      winStreak: user.stats.winStreak,
      bestStreak: user.stats.bestStreak,
      winRate: user.stats.totalGames > 0 
        ? ((user.stats.wins / user.stats.totalGames) * 100).toFixed(2)
        : 0,
      lastPlayed: user.lastPlayed
    }))

    res.json(formattedLeaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

// Get user rank
router.get('/rank/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const userStats = await UserStats.findOne({ userId })

    if (!userStats) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Count users with more wins
    const rank = await UserStats.countDocuments({
      'stats.wins': { $gt: userStats.stats.wins }
    }) + 1

    // Get total users
    const totalUsers = await UserStats.countDocuments()

    res.json({
      rank,
      totalUsers,
      percentile: totalUsers > 0 
        ? (((totalUsers - rank) / totalUsers) * 100).toFixed(2)
        : 0
    })
  } catch (error) {
    console.error('Error fetching user rank:', error)
    res.status(500).json({ error: 'Failed to fetch user rank' })
  }
})

export default router
