// Import Express Router and Async Errors:
const blogRouter = require('express').Router()
require('express-async-errors')

// Import Blog Model:
const Blog = require('../models/blog')

// Import Logger:
const logger = require('../utils/logger')

// [GET] Get All Blogs:
blogRouter.get('/', async (req, res) => {
  logger.info('[Express] Getting All Blogs...')
  const blogs = await Blog.findAll()
  logger.info('[Express] Blogs Fetched:', JSON.stringify(blogs))
  res.json(blogs)
})

// [GET] Get Blog by ID:
blogRouter.get('/:id', async (req, res) => {
  logger.info('[Express] Getting Blog by ID...')
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    logger.info('[Express] Blog Fetched:', JSON.stringify(blog))
    res.json(blog)
  } else {
    logger.error('[Express] Blog Not Found')
    res.status(404).end()
  }
})

// [POST] Create Blog:
blogRouter.post('/', async (req, res) => {
  logger.info('[Express] Creating Blog...')
  const blog = await Blog.create(req.body)
  logger.info('[Express] Blog Created: ', JSON.stringify(blog))
  res.json(blog)
})

// [PUT] Update Blog:
blogRouter.put('/:id', async (req, res) => {
  logger.info('[Express] Updating Blog...')
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    logger.info('[Express] Blog Found')
    blog.likes = req.body.likes
    await blog.save()
    logger.info('[Express] Blog Updated: ', JSON.stringify(blog))
    res.json(blog)
  } else {
    logger.error('[Express] Blog Not Found')
    res.status(404).end()
  }
})

// [DELETE] Delete Blog:
blogRouter.delete('/:id', async (req, res) => { 
  logger.info('[Express] Deleting Blog...')
  await Blog.destroy({ where: { id: req.params.id } })
  logger.info('[Express] Blog Deleted')
  res.status(204).end()
})

// Export Blog Routes:
module.exports = blogRouter 