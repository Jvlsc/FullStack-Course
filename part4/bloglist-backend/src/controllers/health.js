// Import the Express Router:
const healthRouter = require('express').Router()
require('express-async-errors')

// [GET] Route - Health Check:
healthRouter.get('/health', (request, response) => {
  response.send('ok')
})

healthRouter.get('/version', (request, response) => {
  response.send('1')
})

// Export the Health Router:
module.exports = healthRouter