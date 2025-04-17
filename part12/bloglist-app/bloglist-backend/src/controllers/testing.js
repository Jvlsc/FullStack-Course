// Import the Express Router and Express-Async-Errors:
const testingRouter = require('express').Router()
require('express-async-errors')

// Import the Note and User Models:
const Blog = require('../models/blog')
const User = require('../models/user')

// [POST] Route - Reset the Database:
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

// Export the Testing Router:
module.exports = testingRouter