// Import the App Module:
const app = require('./app')

// Import the Config Module:
const config = require('./utils/config')

// Import the Logger Module:
const logger = require('./utils/logger')

// Start the Server:
app.listen(config.SERVER_PORT, () => {
  logger.info(`[Express] Server running on port ${config.SERVER_PORT}`)
})