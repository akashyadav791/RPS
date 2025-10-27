import express from 'express'
import UserStats from '../models/UserStats.js'

const router = express.Router()

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const userStats = await UserStats.findOne({ userId })

    if (!userStats) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(userStats)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Get user stats only
router.get('/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params

    const userStats = await UserStats.findOne({ userId })

    if (!userStats) {
      // Return default stats if user not found
      return res.json({
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winStreak: 0,
        bestStreak: 0
      })
    }

    res.json(userStats.stats)
  } catch (error) {
    console.error('Error fetching user stats:', error)
    res.status(500).json({ error: 'Failed to fetch user stats' })
  }
})

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { userId, displayName, email } = req.body

    if (!userId || !displayName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check if user already exists
    let user = await UserStats.findOne({ userId })

    if (user) {
      // User already exists, just return it
      return res.json(user)
    }

    // Create new user
    user = new UserStats({
      userId,
      displayName,
      email: email || '',
      stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winStreak: 0,
        bestStreak: 0
      }
    })
    await user.save()

    res.json(user)
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

// Create or update user
router.post('/', async (req, res) => {
  try {
    const { userId, displayName, email } = req.body

    if (!userId || !displayName || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    let user = await UserStats.findOne({ userId })

    if (user) {
      // Update existing user
      user.displayName = displayName
      user.email = email
      await user.save()
    } else {
      // Create new user
      user = new UserStats({
        userId,
        displayName,
        email,
        stats: {
          totalGames: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          winStreak: 0,
          bestStreak: 0
        }
      })
      await user.save()
    }

    res.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    res.status(500).json({ error: 'Failed to create/update user' })
  }
})

// Delete user
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const result = await UserStats.deleteOne({ userId })

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
