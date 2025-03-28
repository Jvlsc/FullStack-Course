// Import the Morgan Module:
const morgan = require('morgan')

// Create a custom token for POST body
morgan.token('post-body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

// Morgan Middleware:
const requestLogger = morgan('[Express] :method :url | :status | :res[content-length] bytes | :response-time ms | :post-body |')

// Export the Morgan Middleware:
module.exports = requestLogger