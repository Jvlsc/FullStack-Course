// Import Test Tools:
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const helper = require('../src/utils/test_helper')

// Import Mongoose:
const mongoose = require('mongoose')

// Import App:
const app = require('../src/app')

// Create Supertest Instance:
const api = supertest(app)


//HTTP API Tests:
describe('TESTS - HTTP API:', () => {
  beforeEach(async () => {
    console.log('Cleaning and Populating Database...')
    await helper.cleanAndPopulateBlogsDB()
  })

  // [GET] Route Tests:
  describe('[GET /api/blogs] - Get All Blogs:', () => {
    // Test - Check if Blogs are Returned as JSON correctly:
    test('All blogs are returned correctly as JSON...', async () => {
      // Send GET request to API:
      await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    // Test - Check if All Blogs are Returned correctly:
    test('All blogs are returned correctly...', async () => {
      // Send GET request to API:
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.blogs.length)
    })

    // Test - Check if a specific blog is returned:
    test('A specific blog is within the returned blogs...', async () => {
      // Send GET request to API:
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // Map Titles:
      const titles = response.body.map(blog => blog.title)

      assert.ok(titles.includes(helper.blogs[0].title))
    })
  })

  // [POST] Route Tests:
  describe('[POST /api/blogs] - Create a new blog:', () => {
    // Test - Check if a new blog can be added and response is correct:
    test('A new blog can be added and response is correct...', async () => {
      // Create New Blog:
      const newBlog = { ...helper.blogs[0] }
      delete newBlog._id
      delete newBlog.__v

      // Send new blog to API:
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    // Test - Check if a new blog can be added correctly:
    test('A new blog can be added correctly...', async () => {
      // Create New Blog:
      const newBlog = { ...helper.blogs[0] }
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
      // Create New Blog (Invalid):
      const newBlog = { ...helper.blogs[0] }
      delete newBlog._id
      delete newBlog.__v
      delete newBlog.title

      // Send new blog to API:
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

      // Request all blogs from DB:
      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.blogs.length)
    })
  })

  // [DELETE] Route Tests:
  describe('[DELETE /api/blogs/:id] - Delete a blog:', () => {
    // Test - Check if a blog can be deleted:
    test('A blog can be deleted and response is correct...', async () => {
      // Request all blogs from DB and Get First Blog:
      const blogsInDb = await helper.blogsInDb()
      const blogToDelete = blogsInDb[0]

      // Send delete request to API:
      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    })

    // Test - Check if a blog can be deleted correctly:
    test('A blog can be deleted correctly...', async () => {
      // Request all blogs from DB and Get First Blog:
      const blogsInDb = await helper.blogsInDb()
      const blogToDelete = blogsInDb[0]

      // Send delete request to API:
      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      // Request all blogs from DB and Map Titles:
      const blogsInDbAfterDelete = await helper.blogsInDb()
      const titles = blogsInDbAfterDelete.map(r => r.title)

      assert.strictEqual(blogsInDbAfterDelete.length, blogsInDb.length - 1)
      assert.ok(!titles.includes(blogToDelete.title))
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})