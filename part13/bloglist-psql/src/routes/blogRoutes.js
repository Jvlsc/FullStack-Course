// Import Express Router:
const blogRouter = require('express').Router()

// Import Blog Model:
const Blog = require('../models/blog')

// [GET] Get All Blogs:
blogRouter.get('/', async (req, res) => {
  try {
    console.log('[Express] Getting All Blogs...')
    const blogs = await Blog.findAll()
    console.log('[Express] Blogs Fetched:', JSON.stringify(blogs))
    res.json(blogs)
  } catch (error) {
    console.error('[Express] Error Getting All Blogs: ', error)
    res.status(500).json({ error: error.message })
  }
})

// [GET] Get Blog by ID:
blogRouter.get('/:id', async (req, res) => {
  try{
    console.log('[Express] Getting Blog by ID...')
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      console.log('[Express] Blog Fetched:', JSON.stringify(blog))
      res.json(blog)
    } else {
      console.log('[Express] Blog Not Found')
      res.status(404).end()
    }
  } catch (error) {
    console.error('[Express] Error Getting Blog by ID: ', error)
    res.status(500).json({ error: error.message })
  }
})

// [POST] Create Blog:
blogRouter.post('/', async (req, res) => {
  try {
    console.log('[Express] Creating Blog...')
    const blog = await Blog.create(req.body)
    console.log('[Express] Blog Created: ', JSON.stringify(blog))
    res.json(blog)
  } catch (error) {
    console.error('[Express] Error Creating Blog: ', error)
    res.status(400).json({ error: error.message })
  }
})

// [PUT] Update Blog:
blogRouter.put('/:id', async (req, res) => {
  try{
    console.log('[Express] Updating Blog...')
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      console.log('[Express] Blog Found')
      blog.likes = req.body.likes
      await blog.save()
      console.log('[Express] Blog Updated: ', JSON.stringify(blog))
      res.json(blog)
    } else {
      console.log('[Express] Blog Not Found')
      res.status(404).end()
    }
  } catch (error) {
    console.error('[Express] Error Updating Blog: ', error)
    res.status(500).json({ error: error.message })
  }
})

// [DELETE] Delete Blog:
blogRouter.delete('/:id', async (req, res) => {
  try {
    console.log('[Express] Deleting Blog...')
    await Blog.destroy({ where: { id: req.params.id } })
    console.log('[Express] Blog Deleted')
    res.status(204).end()
  } catch (error) {
    console.error('[Express] Error Deleting Blog: ', error)
    res.status(500).json({ error: error.message })
  }
})

// Export Blog Routes:
module.exports = blogRouter 