import express from 'express'
import GameRoom from '../models/GameRoom.js'
import ActiveSession from '../models/ActiveSession.js'
import { nanoid } from 'nanoid'

const router = express.Router()

// Create a new game room
router.post('/create', async (req, res) => {
  try {
    const { userId, displayName, roomName, isPrivate, password, totalRounds } = req.body

    if (!userId || !displayName || !roomName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const roomId = nanoid(10)

    const room = new GameRoom({
      roomId,
      roomName,
      hostId: userId,
      hostName: displayName,
      isPrivate: isPrivate || false,
      password: password || null,
      totalRounds: totalRounds || 3
    })

    await room.save()

    // Update user session
    await ActiveSession.findOneAndUpdate(
      { userId },
      { status: 'in-game', currentRoom: roomId }
    )

    res.json({ 
      message: 'Room created',
      room 
    })
  } catch (error) {
    console.error('Error creating room:', error)
    res.status(500).json({ error: 'Failed to create room' })
  }
})

// Get all available rooms
router.get('/available', async (req, res) => {
  try {
    const rooms = await GameRoom.find({
      status: 'waiting',
      guestId: null,
      isPrivate: false,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 })

    res.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    res.status(500).json({ error: 'Failed to fetch rooms' })
  }
})

// Join a room
router.post('/join', async (req, res) => {
  try {
    const { roomId, userId, displayName, password } = req.body

    if (!roomId || !userId || !displayName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const room = await GameRoom.findOne({ roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    if (room.guestId) {
      return res.status(400).json({ error: 'Room is full' })
    }

    if (room.isPrivate && room.password !== password) {
      return res.status(403).json({ error: 'Invalid password' })
    }

    room.guestId = userId
    room.guestName = displayName
    room.status = 'in-progress'
    await room.save()

    // Update user session
    await ActiveSession.findOneAndUpdate(
      { userId },
      { status: 'in-game', currentRoom: roomId }
    )

    res.json({ 
      message: 'Joined room',
      room 
    })
  } catch (error) {
    console.error('Error joining room:', error)
    res.status(500).json({ error: 'Failed to join room' })
  }
})

// Get room details
router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params

    const room = await GameRoom.findOne({ roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    console.error('Error fetching room:', error)
    res.status(500).json({ error: 'Failed to fetch room' })
  }
})

// Make a move in the room
router.post('/:roomId/move', async (req, res) => {
  try {
    const { roomId } = req.params
    const { userId, choice } = req.body

    if (!choice || !['rock', 'paper', 'scissors'].includes(choice)) {
      return res.status(400).json({ error: 'Invalid choice' })
    }

    const room = await GameRoom.findOne({ roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    // Determine if user is host or guest
    const isHost = room.hostId === userId
    const isGuest = room.guestId === userId

    if (!isHost && !isGuest) {
      return res.status(403).json({ error: 'You are not in this room' })
    }

    // Update choice
    if (isHost) {
      room.gameState.hostChoice = choice
    } else {
      room.gameState.guestChoice = choice
    }

    // Check if both players made their choice
    if (room.gameState.hostChoice && room.gameState.guestChoice) {
      // Determine winner
      const result = determineWinner(room.gameState.hostChoice, room.gameState.guestChoice)
      
      if (result === 'host') {
        room.scores.host++
        room.gameState.roundWinner = room.hostName
      } else if (result === 'guest') {
        room.scores.guest++
        room.gameState.roundWinner = room.guestName
      } else {
        room.gameState.roundWinner = 'draw'
      }

      room.currentRound++

      // Check if game is finished
      if (room.currentRound >= room.totalRounds) {
        room.status = 'finished'
        
        // Update sessions
        await ActiveSession.updateMany(
          { userId: { $in: [room.hostId, room.guestId] } },
          { status: 'online', currentRoom: null }
        )
      }
    }

    await room.save()

    res.json({ 
      message: 'Move registered',
      room 
    })
  } catch (error) {
    console.error('Error making move:', error)
    res.status(500).json({ error: 'Failed to make move' })
  }
})

// Leave/Delete room
router.post('/:roomId/leave', async (req, res) => {
  try {
    const { roomId } = req.params
    const { userId } = req.body

    const room = await GameRoom.findOne({ roomId })

    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }

    // If host leaves, delete room
    if (room.hostId === userId) {
      await GameRoom.deleteOne({ roomId })
      
      // Update both players' sessions
      await ActiveSession.updateMany(
        { userId: { $in: [room.hostId, room.guestId].filter(Boolean) } },
        { status: 'online', currentRoom: null }
      )
    } else if (room.guestId === userId) {
      // If guest leaves, reset guest and go back to waiting
      room.guestId = null
      room.guestName = null
      room.status = 'waiting'
      room.gameState = {
        hostChoice: null,
        guestChoice: null,
        roundWinner: null
      }
      await room.save()
      
      await ActiveSession.findOneAndUpdate(
        { userId },
        { status: 'online', currentRoom: null }
      )
    }

    res.json({ message: 'Left room' })
  } catch (error) {
    console.error('Error leaving room:', error)
    res.status(500).json({ error: 'Failed to leave room' })
  }
})

// Helper function to determine winner
function determineWinner(hostChoice, guestChoice) {
  if (hostChoice === guestChoice) return 'draw'
  
  const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  }
  
  return winConditions[hostChoice] === guestChoice ? 'host' : 'guest'
}

export default router
