import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import gameRoutes from './routes/gameRoutes.js'
import leaderboardRoutes from './routes/leaderboardRoutes.js'
import userRoutes from './routes/userRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'
import roomRoutes from './routes/roomRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

app.use('/api/', limiter)

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rps-game')
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

connectDB()

// Routes
app.use('/api/games', gameRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/sessions', sessionRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Rock Paper Scissors API is running',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
