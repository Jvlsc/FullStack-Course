// Import Express Router and Async Errors:
const blogRouter = require('express').Router()
require('express-async-errors')

// Import Token Extractor:
const tokenExtractor = require('../middlewares/tokenExtractor')

// Import Blog Model:
const { Blog, User } = require('../models')

// Import Logger:
const logger = require('../utils/logger')

// [GET] Get All Blogs:
blogRouter.get('/', async (req, res) => {
  logger.info('[Express] Getting All Blogs...')
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
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
blogRouter.post('/', tokenExtractor, async (req, res) => {
  logger.info('[Express] Creating Blog...')
  const user = await User.findByPk(req.decodedToken.id)
  if (!user) {
    logger.error('[Express] User Not Found')
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const blog = await Blog.create({ ...req.body, userId: user.id })
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
blogRouter.delete('/:id', tokenExtractor, async (req, res) => { 
  logger.info('[Express] Deleting Blog...')

  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)
  if (!user || blog.userId !== user.id) {
    logger.error('[Express] User Not Found or Not Authorized')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  await Blog.destroy({ where: { id: req.params.id } })
  logger.info('[Express] Blog Deleted')
  res.status(204).end()
})

// Export Blog Routes:
module.exports = blogRouter 