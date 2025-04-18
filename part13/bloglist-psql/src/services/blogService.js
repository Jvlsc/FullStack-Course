// Import Blog Model:
const Blog = require('../models/blog')

// [POSTGRESQL] Get All Blogs:
const getAll = async () => {
  return await Blog.findAll()
}

// [POSTGRESQL] Create Blog:
const create = async (blogData) => {
  return await Blog.create(blogData)
}

// [POSTGRESQL] Delete Blog:
const remove = async (id) => {
  return await Blog.destroy({ where: { id } })
}

// Export Blog Service:
module.exports = {
  getAll,
  create,
  remove
} 