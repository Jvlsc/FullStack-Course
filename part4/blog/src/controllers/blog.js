// Import the Express Router:
const blogRouter = require('express').Router()

// Import the Blog Model:
const Blog = require('../models/blog')

// [GET] Route - Get All Blogs:
blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
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