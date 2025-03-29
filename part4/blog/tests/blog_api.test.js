// Import Test Tools:
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const helper = require('../src/utils/test_helper')

// Import Blog Model:
const Blog = require('../src/models/blog')

// Import Mongoose:
const mongoose = require('mongoose')

// Import App:
const app = require('../src/app')

// Create Supertest Instance:
const api = supertest(app)


//HTTP API Tests:
describe('TESTS - HTTP API:', () => {
  beforeEach(async () => {
    // Delete All Blogs:
    await Blog.deleteMany({})

    // Create Test Blogs:
    const blogObjects = helper.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('[GET /api/blogs] - Get All Blogs:', () => {
    // Test - Check if Blogs are Returned as JSON correctly:
    test('Blogs are returned correctly as JSON...', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    // Test - Check if All Blogs are Returned correctly:
    test('All blogs are returned correctly...', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.blogs.length)
    })

    // Test - Check if a specific blog is returned:
    test('A specific blog is within the returned blogs...', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const titles = response.body.map(blog => blog.title)
      assert.ok(titles.includes(helper.blogs[0].title))
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})