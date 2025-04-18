// Import Config:
const config = require('./config/config')

// Import App:
const app = require('./app')

// Import Database Tools:
const { connectToDatabase } = require('./config/database')

// Start Backend Function:
const startBackend = async () => {
  try {
    // Connect to Database:
    await connectToDatabase()
    
    // Start Express Server:
    console.log('[Express] Starting Express Server...')
    app.listen(config.SERVER_PORT, () => {
      console.log(`[Express] Server Running: http://localhost:${config.SERVER_PORT}`)
    })
  } catch (error) {
    console.error('[Express] Error Starting Express Server:', error)
    await sequelize.close()
    await app.close()
    process.exit(1)
  }
}

// Start Backend:
startBackend()