import express from 'express'
import Game from '../models/Game.js'
import UserStats from '../models/UserStats.js'

const router = express.Router()

// Save a game result
router.post('/save', async (req, res) => {
  try {
    const { userId, userChoice, computerChoice, result, timestamp } = req.body

    // Validate input
    if (!userId || !userChoice || !computerChoice || !result) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create game record
    const game = new Game({
      userId,
      userChoice,
      computerChoice,
      result,
      timestamp: timestamp || new Date()
    })

    await game.save()

    // Update user stats
    let userStats = await UserStats.findOne({ userId })

    if (!userStats) {
      // Create new user stats if doesn't exist
      userStats = new UserStats({
        userId,
        displayName: req.body.displayName || 'Anonymous',
        email: req.body.email || '',
        stats: {
          totalGames: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          winStreak: 0,
          bestStreak: 0
        }
      })
    }

    // Update stats
    userStats.stats.totalGames++
    userStats.lastPlayed = new Date()

    if (result === 'win') {
      userStats.stats.wins++
      userStats.stats.winStreak++
      if (userStats.stats.winStreak > userStats.stats.bestStreak) {
        userStats.stats.bestStreak = userStats.stats.winStreak
      }
    } else if (result === 'lose') {
      userStats.stats.losses++
      userStats.stats.winStreak = 0
    } else {
      userStats.stats.draws++
    }

    await userStats.save()

    res.status(201).json({
      message: 'Game saved successfully',
      game,
      stats: userStats.stats
    })
  } catch (error) {
    console.error('Error saving game:', error)
    res.status(500).json({ error: 'Failed to save game' })
  }
})

// Get game history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const limit = parseInt(req.query.limit) || 50

    const games = await Game.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)

    res.json(games)
  } catch (error) {
    console.error('Error fetching game history:', error)
    res.status(500).json({ error: 'Failed to fetch game history' })
  }
})

// Get user statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const userStats = await UserStats.findOne({ userId })

    if (!userStats) {
      return res.status(404).json({ error: 'User stats not found' })
    }

    res.json(userStats)
  } catch (error) {
    console.error('Error fetching user stats:', error)
    res.status(500).json({ error: 'Failed to fetch user stats' })
  }
})

// Get recent games (all users)
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20

    const games = await Game.find()
      .sort({ timestamp: -1 })
      .limit(limit)

    res.json(games)
  } catch (error) {
    console.error('Error fetching recent games:', error)
    res.status(500).json({ error: 'Failed to fetch recent games' })
  }
})

export default router
