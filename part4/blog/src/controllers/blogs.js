// Import the Express Router and Express-Async-Errors:
const blogRouter = require('express').Router()
require('express-async-errors')

// Import the JSON Web Token:
const jwt = require('jsonwebtoken')

// Import the Blog Model:
const Blog = require('../models/blog')

// Import the User Model:
const User = require('../models/user')

// Import the Config Module:
const config = require('../utils/config')

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
    response.status(404).json({ error: 'Blog Not Found' })
  } else {
    response.json(blog)
  }
})

// [POST] Route - Create a New Blog:
blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SERVER_SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'Invalid Token' })

  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(401).json({ error: 'Invalid Token' })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
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
    response.status(404).json({ error: 'Blog Not Found' })
  } else {
    response.json(updatedBlog)
  }
})

// [DELETE] Route - Delete a Blog:
blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SERVER_SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'Invalid Token' })

  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(401).json({ error: 'Invalid Token' })

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({ error: 'Blog Not Found' })

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    response.status(404).json({ error: 'Blog Not Found' })
  } else {
    response.status(204).json(deletedBlog)
  }
})

// Export the Blog Router:
module.exports = blogRouter