import mongoose from 'mongoose'

const userStatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    default: ''
  },
  stats: {
    totalGames: {
      type: Number,
      default: 0
    },
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    draws: {
      type: Number,
      default: 0
    },
    winStreak: {
      type: Number,
      default: 0
    },
    bestStreak: {
      type: Number,
      default: 0
    }
  },
  lastPlayed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for leaderboard queries
userStatsSchema.index({ 'stats.wins': -1 })
userStatsSchema.index({ 'stats.totalGames': -1 })

const UserStats = mongoose.model('UserStats', userStatsSchema)

export default UserStats
