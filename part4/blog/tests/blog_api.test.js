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

  describe('[POST /api/blogs] - Create a new blog:', () => {
    // Test - Check if a new blog can be added and response is correct:
    test('A new blog can be added and response is correct...', async () => {
      const newBlog = helper.blogs[0]
      delete newBlog._id
      delete newBlog.__v

      // Send new blog to API:
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    // Test - Check if a new blog can be added correctly:
    test('A new blog can be added correctly...', async () => {
      const newBlog = helper.blogs[0]
      delete newBlog._id
      delete newBlog.__v

      // Send new blog to API:
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Request all blogs from DB:
      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.blogs.length + 1)
      assert.strictEqual(blogsInDb[blogsInDb.length - 1].title, newBlog.title)
    })

    // Test - Check error if new blog data is invalid:
    test('Fails with status code 400 if new blog data is invalid...', async () => {
      const newBlog = helper.blogs[0]
      delete newBlog._id
      delete newBlog.__v
      delete newBlog.title

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})