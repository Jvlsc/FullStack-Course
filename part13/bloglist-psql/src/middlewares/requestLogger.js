// Import the Morgan Module:
const morgan = require('morgan')

// Create a custom token for POST body
morgan.token('post-body', (request) => {
  if (request.method === 'POST' || request.method === 'PUT') {
    return JSON.stringify(request.body)
  }
  return ''
})

const requestLogger = morgan('[Express] :method :url | :status | :res[content-length] bytes | :response-time ms | :post-body |')

module.exports = requestLogger