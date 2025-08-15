import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-app'

export const connectDatabase = async (): Promise<void> => {
  try {
    console.log('🔄 Connecting to MongoDB...')
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')) // Hide credentials in logs

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    })

    console.log('✅ Connected to MongoDB successfully')
    console.log('🗄️  Database:', mongoose.connection.db?.databaseName)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    console.log('💡 Make sure MongoDB is running locally or use MongoDB Atlas')
    console.log('🔧 To start local MongoDB: mongod --dbpath ./data/db')

    // Don't exit in development or if no MongoDB URI, continue with mock data
    if (process.env.NODE_ENV !== 'production' || !process.env.MONGODB_URI) {
      console.log('⚠️  Continuing without database connection (using mock data)')
      return
    }

    process.exit(1)
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error)
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
  console.error('❌ Mongoose connection error:', error)
})

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDatabase()
  process.exit(0)
})
