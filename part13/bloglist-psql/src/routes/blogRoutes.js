// Import Express Router:
const blogRouter = require('express').Router()

// Import Blog Service:
const blogService = require('../services/blogService')

// [GET] Get All Blogs:
blogRouter.get('/', async (req, res) => {
  try {
    console.log('[Express] Getting All Blogs...')
    const blogs = await blogService.getAll()
    console.log('[Express] Blogs Fetched:', JSON.stringify(blogs))
    res.json(blogs)
  } catch (error) {
    console.error('[Express] Error Getting All Blogs: ', error)
    res.status(500).json({ error: error.message })
  }
})

// [POST] Create Blog:
blogRouter.post('/', async (req, res) => {
  console.log('[Express] Creating Blog...')
  try {
    const blog = await blogService.create(req.body)
    console.log('[Express] Blog Created: ', JSON.stringify(blog))
    res.json(blog)
  } catch (error) {
    console.error('[Express] Error Creating Blog: ', error)
    res.status(400).json({ error: error.message })
  }
})

// [DELETE] Delete Blog:
blogRouter.delete('/:id', async (req, res) => {
  try {
    console.log('[Express] Deleting Blog...')
    await blogService.remove(req.params.id)
    console.log('[Express] Blog Deleted')
    res.status(204).end()
  } catch (error) {
    console.error('[Express] Error Deleting Blog: ', error)
    res.status(500).json({ error: error.message })
  }
})

// Export Blog Routes:
module.exports = blogRouter 