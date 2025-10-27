import mongoose from 'mongoose'

const gameRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  roomName: {
    type: String,
    required: true
  },
  hostId: {
    type: String,
    required: true
  },
  hostName: {
    type: String,
    required: true
  },
  guestId: {
    type: String,
    default: null
  },
  guestName: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['waiting', 'in-progress', 'finished'],
    default: 'waiting'
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    default: null
  },
  maxPlayers: {
    type: Number,
    default: 2
  },
  currentRound: {
    type: Number,
    default: 0
  },
  totalRounds: {
    type: Number,
    default: 3
  },
  scores: {
    host: { type: Number, default: 0 },
    guest: { type: Number, default: 0 }
  },
  gameState: {
    hostChoice: { type: String, default: null },
    guestChoice: { type: String, default: null },
    roundWinner: { type: String, default: null }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 3600000) // 1 hour
  }
}, {
  timestamps: true
})

// Auto-delete expired rooms
gameRoomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const GameRoom = mongoose.model('GameRoom', gameRoomSchema)

export default GameRoom
