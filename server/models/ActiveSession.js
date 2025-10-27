import mongoose from 'mongoose'

const activeSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  displayName: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,
  isOnline: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
})

// Automatically expire sessions after 5 minutes of inactivity
activeSessionSchema.index({ lastActive: 1 }, { expireAfterSeconds: 300 })

const ActiveSession = mongoose.model('ActiveSession', activeSessionSchema)

export default ActiveSession
