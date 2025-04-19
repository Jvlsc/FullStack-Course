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

  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).send({ error: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid Token' })
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token Expired' })
  }

  next(error)
}

// Export the errorHandler Middleware:
module.exports = errorHandler