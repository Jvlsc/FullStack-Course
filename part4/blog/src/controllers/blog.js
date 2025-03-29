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

// [GET] Route - Get a Single Blog:
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  } else {
    response.json(blog)
  }
})

// [POST] Route - Create a New Blog:
blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// [PUT] Route - Update a Blog:
blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $set: { likes: request.body.likes } },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
  if (!updatedBlog) {
    response.status(404).end()
  } else {
    response.json(updatedBlog)
  }
})

// [DELETE] Route - Delete a Blog:
blogRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    response.status(404).end()
  } else {
    response.status(204).end()
  }
})

// Export the Blog Router:
module.exports = blogRouter