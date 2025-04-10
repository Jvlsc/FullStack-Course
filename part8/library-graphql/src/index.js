// Import Apollo Server:
const { startApolloServer } = require('./server.js')

// Import Mongoose & Models:
const mongoose = require('mongoose')

// Import Config Module:
const config = require('./utils/config')

// Connect to MongoDB:
console.log('[MongoDB] Connecting to MongoDB')
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('[MongoDB] Connected to MongoDB')
    try {
      console.log('[Apollo] Starting Apollo Server...')
      startApolloServer()
    } catch (error) {
      console.error('[Apollo] Error starting Apollo Server:', error)
      mongoose.connection.close()
      process.exit(1)
    }
  })
  .catch((error) => {
    console.log('[MongoDB] Error connecting to MongoDB:', error.message)
    mongoose.connection.close()
    process.exit(1)
  })