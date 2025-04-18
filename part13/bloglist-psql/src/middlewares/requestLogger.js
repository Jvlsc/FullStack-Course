// Import the Morgan Module:
const morgan = require('morgan')

// Custom Token for POST/PUT Body:
morgan.token('post-body', (request) => {
  if (request.method === 'POST' || request.method === 'PUT') {
    return JSON.stringify(request.body)
  }
  return ''
})

// Request Logger:
const requestLogger = morgan('[Express] :method :url | :status | :res[content-length] bytes | :response-time ms | :post-body |')

// Export Request Logger:
module.exports = requestLogger