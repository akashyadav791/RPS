import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  userChoice: {
    type: String,
    required: true,
    enum: ['rock', 'paper', 'scissors']
  },
  computerChoice: {
    type: String,
    required: true,
    enum: ['rock', 'paper', 'scissors']
  },
  result: {
    type: String,
    required: true,
    enum: ['win', 'lose', 'draw']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for faster queries
gameSchema.index({ userId: 1, timestamp: -1 })

const Game = mongoose.model('Game', gameSchema)

export default Game
