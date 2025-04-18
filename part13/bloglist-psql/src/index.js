// Import Config:
const config = require('./config/config')

// Import Database Tools:
const { connectToDatabase } = require('./config/database')

// Import App:
const app = require('./app')

// Import Logger:
const logger = require('./utils/logger')

// Start Backend Function:
const startBackend = async () => {
  try {
    // Connect to Database:
    await connectToDatabase()
    
    // Start Express Server:
    logger.info('[Express] Starting Express Server...')
    app.listen(config.SERVER_PORT, () => {
      logger.info(`[Express] Server Running: http://localhost:${config.SERVER_PORT}`)
    })
  } catch (error) {
    logger.error('[Express] Error Starting Express Server:', error)
    await sequelize.close()
    await app.close()
    process.exit(1)
  }
}

// Start Backend:
startBackend()