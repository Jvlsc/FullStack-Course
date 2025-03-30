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

// Blog Model Tests:
describe('TESTS - Blog Model:', () => {
  // Before Each Test:
  beforeEach(async () => {
    await mongoose.connect(config.MONGODB_URI)
    await Blog.deleteMany({})
  })

  test('Check if the unique identifier property of the blog posts is named id...', async () => {
    const blog = new Blog(helper.blogs[0])
    const savedBlog = await blog.save()
    const blogJson = savedBlog.toJSON()

    assert.strictEqual(blogJson.id, helper.blogs[0]._id.toString())
    assert.strictEqual(blogJson._id, undefined)
  })

  test('Check if the likes property is defaulted to 0 if not provided...', async () => {
    const blog = new Blog({
      title: helper.blogs[0].title,
      author: helper.blogs[0].author,
      url: helper.blogs[0].url
    })

    const savedBlog = await blog.save()
    const blogJson = savedBlog.toJSON()

    assert.strictEqual(blogJson.likes, 0)
  })

  test('Check if a single blog post is saved correctly...', async () => {
    const blog = new Blog(helper.blogs[0])
    const savedBlog = await blog.save()
    const blogJson = savedBlog.toJSON()

    assert.strictEqual(blogJson.title, helper.blogs[0].title)
  })

  test('Check if multiple blog posts are saved correctly...', async () => {
    await Blog.insertMany(helper.blogs)
    const blogs = await Blog.find({})
    const blogsJson = blogs.map(blog => blog.toJSON())

    assert.strictEqual(blogsJson.length, helper.blogs.length)
    assert.strictEqual(blogsJson[0].title, helper.blogs[0].title)
    assert.strictEqual(blogsJson[1].title, helper.blogs[1].title)
  })

  // After All Tests:
  after(async () => {
    await mongoose.connection.close()
  })
})