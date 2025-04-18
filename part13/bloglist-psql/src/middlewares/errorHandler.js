// Import the Logger Module:
const logger = require('../utils/logger')

// Error Handler Middleware:
const errorHandler = (error, request, response, next) => {
  logger.error(`[Express] Error in Request ${request.method} ${request.path}: ${error}`)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(500).send({ error: error.message })
  }

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// Export the errorHandler Middleware:
module.exports = errorHandler