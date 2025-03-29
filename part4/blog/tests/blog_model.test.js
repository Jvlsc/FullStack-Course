// Import Test Tools:
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('../src/utils/test_helper')

// Import Blog Model:
const Blog = require('../src/models/blog')

// Import Config:
const config = require('../src/utils/config')

// Import Mongoose:
const mongoose = require('mongoose')


describe('TESTS - Blog Model:', () => {
  beforeEach(async () => {
    // Connect to MongoDB:
    await mongoose.connect(config.MONGODB_URI)

    // Delete All Blogs:
    await Blog.deleteMany({})
  })

  test('Check if the unique identifier property of the blog posts is named id...', async () => {
    // Create a new Blog:
    const blog = new Blog(helper.blogs[0])

    // Save the Blog:
    const savedBlog = await blog.save()

    // Convert the Blog to JSON:
    const blogJson = savedBlog.toJSON()

    // Check id is defined and _id is undefined:
    assert.strictEqual(blogJson.id, helper.blogs[0]._id.toString())
    assert.strictEqual(blogJson._id, undefined)
  })

  test('Check if the likes property is defaulted to 0 if not provided...', async () => {
    // Create a new Blog:
    const blog = new Blog({
      title: helper.blogs[0].title,
      author: helper.blogs[0].author,
      url: helper.blogs[0].url
    })

    // Save the Blog:
    const savedBlog = await blog.save()

    // Convert the Blog to JSON:
    const blogJson = savedBlog.toJSON()

    // Check if likes is defaulted to 0 if not provided:
    assert.strictEqual(blogJson.likes, 0)
  })

  test('Check if the blog posts are saved correctly...', async () => {
    // Create a new Blog:
    const blog = new Blog(helper.blogs[0])

    // Save the Blog:
    const savedBlog = await blog.save()

    // Convert the Blog to JSON:
    const blogJson = savedBlog.toJSON()

    // Check if the blog posts are saved correctly:
    assert.strictEqual(blogJson.title, helper.blogs[0].title)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})