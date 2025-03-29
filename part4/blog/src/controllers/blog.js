// Import the Express Router and Express-Async-Errors:
const blogRouter = require('express').Router()
require('express-async-errors')

// Import the Blog Model:
const Blog = require('../models/blog')

// [GET] Route - Get All Blogs:
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// [POST] Route - Create a New Blog:
blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

// Export the Blog Router:
module.exports = blogRouter