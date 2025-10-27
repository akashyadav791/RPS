import express from 'express'
import ActiveSession from '../models/ActiveSession.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Create or update active session
router.post('/session/heartbeat', async (req, res) => {
  try {
    const { userId, displayName } = req.body
    const sessionId = req.body.sessionId || uuidv4()
    
    const session = await ActiveSession.findOneAndUpdate(
      { userId },
      {
        userId,
        displayName,
        sessionId,
        lastActive: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        isOnline: true
      },
      { upsert: true, new: true }
    )

    res.json({ 
      sessionId: session.sessionId,
      message: 'Session updated'
    })
  } catch (error) {
    console.error('Error updating session:', error)
    res.status(500).json({ error: 'Failed to update session' })
  }
})

// Get online players count
router.get('/online-count', async (req, res) => {
  try {
    // Count sessions active in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const count = await ActiveSession.countDocuments({
      lastActive: { $gte: fiveMinutesAgo },
      isOnline: true
    })

    res.json({ 
      onlinePlayers: count,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error getting online count:', error)
    res.status(500).json({ error: 'Failed to get online count' })
  }
})

// Get list of online players
router.get('/online-players', async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const limit = parseInt(req.query.limit) || 50
    
    const players = await ActiveSession.find({
      lastActive: { $gte: fiveMinutesAgo },
      isOnline: true
    })
    .sort({ lastActive: -1 })
    .limit(limit)
    .select('userId displayName lastActive')

    res.json(players)
  } catch (error) {
    console.error('Error getting online players:', error)
    res.status(500).json({ error: 'Failed to get online players' })
  }
})

// User logout/session end
router.post('/session/logout', async (req, res) => {
  try {
    const { userId } = req.body
    
    await ActiveSession.findOneAndUpdate(
      { userId },
      { isOnline: false }
    )

    res.json({ message: 'Session ended' })
  } catch (error) {
    console.error('Error ending session:', error)
    res.status(500).json({ error: 'Failed to end session' })
  }
})

// Clean up old sessions (can be called periodically)
router.delete('/session/cleanup', async (req, res) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    
    const result = await ActiveSession.deleteMany({
      lastActive: { $lt: thirtyMinutesAgo }
    })

    res.json({ 
      message: 'Cleanup complete',
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Error cleaning sessions:', error)
    res.status(500).json({ error: 'Failed to cleanup sessions' })
  }
})

export default router
