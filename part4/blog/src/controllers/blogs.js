// Import the Express Router and Express-Async-Errors:
const blogRouter = require('express').Router()
require('express-async-errors')

// Import the Blog Model:
const Blog = require('../models/blog')

// Import the User Model:
const User = require('../models/user')

// [GET] Route - Get All Blogs:
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// [GET] Route - Get a Single Blog:
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (!blog) {
    response.status(404).end()
  } else {
    response.json(blog)
  }
})

// [POST] Route - Create a New Blog:
blogRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.userId) return response.status(400).json({ error: 'userId is required' })
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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