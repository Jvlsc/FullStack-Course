// Import the Logger Module:
const logger = require('../utils/logger')

// Unknown Endpoint:
const unknownEndpoint = (request, response) => {
  logger.error(`[Express] Unknown Endpoint: ${request.method} ${request.path}`)
  response.status(404).send({ error: 'Unknown Endpoint' })
}

// Export the Unknown Endpoint:
module.exports = unknownEndpoint
