import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDatabase } from './database/connection'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'

// Import routes
import authRoutes from './routes/auth'
import farmRoutes from './routes/farms'
import fieldRoutes from './routes/fields'
import cropRoutes from './routes/crops'
import activityRoutes from './routes/activities'
import inventoryRoutes from './routes/inventory'
import financeRoutes from './routes/finance'
import weatherRoutes from './routes/weather'
import reportRoutes from './routes/reports'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
// CORS Configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)

    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://your-frontend.vercel.app', // Fallback frontend URL
      'http://localhost:5173',  // Local development
      'http://localhost:3000',  // Alternative local port
      'http://127.0.0.1:5173',  // Alternative localhost
      'http://127.0.0.1:3000'   // Alternative localhost
    ].filter(Boolean) as string[]

    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true)
    }

    // In production, check against allowed origins
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'), false)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/farms', farmRoutes)
app.use('/api/fields', fieldRoutes)
app.use('/api/crops', cropRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/reports', reportRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase()

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`)
      console.log(`🍃 MongoDB connection established`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
