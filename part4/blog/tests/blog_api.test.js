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
    await helper.cleanAndPopulateBlogsDB()
  })

  // [GET] Route Tests (All Blogs):
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

  // [GET] Route Tests (Get Single Blog):
  describe('[GET /api/blogs/:id] - Get a Single Blog:', () => {
    // Test - Check if a single blog is returned correctly:
    test('A single blog is returned correctly...', async () => {
      // Request all blogs from DB and Get First Blog:
      const blogsInDb = await helper.blogsInDb()
      const blogToGet = blogsInDb[0]

      // Send GET request to API:
      const response = await api.get(`/api/blogs/${blogToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, blogToGet.title)
    })

    // Test - Check if a blog does not exist:
    test('Fails with statuscode 404 if blog does not exist...', async () => {
      // Get Non-Existing ID:
      const validNonexistingId = await helper.nonExistingId()

      // Send GET request to API:
      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    // Test - Check if blog ID is malformed:
    test('Fails with statuscode 400 if blog ID is malformed...', async () => {
      // Malformatted ID:
      const invalidId = '1234'

      // Send GET request to API:
      await api.get(`/api/blogs/${invalidId}`)
        .expect(400)
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

  // [PUT] Route Tests:
  describe('[PUT /api/blogs/:id] - Update a blog:', () => {
    // Test - Check if a blog can be updated:
    test('A blog can be updated and response is correct...', async () => {
      // Request all blogs from DB and Get First Blog:
      const blogsInDb = await helper.blogsInDb()
      const blogToUpdate = blogsInDb[0]

      // Send update request to API:
      await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 101 })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    // Test - Check if a blog can be updated correctly:
    test('A blog can be updated correctly...', async () => {
      // Request all blogs from DB and Get First Blog:
      const blogsInDb = await helper.blogsInDb()
      const blogToUpdate = blogsInDb[0]

      // Get Original Likes:
      const originalLikes = blogToUpdate.likes

      // Send update request to API:
      const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: originalLikes + 1 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // Check if the blog was updated correctly:
      assert.strictEqual(response.body.likes, originalLikes + 1)
    })

    // Test - Check error if blog ID is malformed:
    test('Fails with status code 400 if blog ID is malformed...', async () => {
      // Malformatted ID:
      const invalidId = '1234'

      // Send update request to API:
      await api.put(`/api/blogs/${invalidId}`)
        .send({ likes: 101 })
        .expect(400)
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

    // Test - Check error if blog ID is malformed:
    test('Fails with status code 400 if blog ID is malformed...', async () => {
      // Malformatted ID:
      const invalidId = '1234'

      // Send delete request to API:
      await api.delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})