// Import the Logger Module:
const logger = require('../utils/logger')

// Error Handler Middleware:
const errorHandler = (error, request, response, next) => {
  logger.error(`[MongoDB] Error in Request ${request.method} ${request.path}: ${error}`)

  // CastError: Detected in GET, PUT and DELETE /api/blogs/:id
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  }

  // ValidationError: Detected in MongoDB Validation Error
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // MongoServerError: Detected in POST /api/users
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  // MongooseError: Detected when MongoDB Connection Fails
  if (error.name === 'MongooseError') {
    response.status(500).send({ error: 'Check MongoDB Connection' })
  }

  // JsonWebTokenError: Detected in POST /api/blogs when token is invalid/missing
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid Token' })
  }

  // TokenExpiredError: Detected in POST /api/blogs when token is expired
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token Expired' })
  }


  next(error)
}

// Export the errorHandler Middleware:
module.exports = errorHandler