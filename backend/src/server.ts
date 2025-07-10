import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
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
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`)
})
