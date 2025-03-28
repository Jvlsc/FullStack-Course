// Import the Logger Module:
const logger = require('../utils/logger')

// Error Handler:
const errorHandler = (error, request, response, next) => {
  logger.error(`[MongoDB] Error in Request ${request.method} ${request.path}: ${error}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Export the Middleware Module:
module.exports = errorHandler