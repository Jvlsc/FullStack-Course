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

// Blogs HTTP API Tests:
describe('TESTS - Blogs HTTP API:', () => {
  // Before Each Test:
  beforeEach(async () => {
    await helper.cleanAndPopulateBlogsDB()
  })

  // [GET] Route Tests (All Blogs):
  describe('[GET /api/blogs] - Get All Blogs:', () => {
    test('All blogs are returned correctly as JSON...', async () => {
      await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('All blogs are returned correctly...', async () => {
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.blogs.length)
    })

    test('A specific blog is within the returned blogs...', async () => {
      const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const titles = response.body.map(blog => blog.title)

      assert.ok(titles.includes(helper.blogs[0].title))
    })
  })

  // [GET] Route Tests (Get Single Blog):
  describe('[GET /api/blogs/:id] - Get a Single Blog:', () => {
    test('A single blog request response is correct...', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToGet = blogsInDb[0]

      await api.get(`/api/blogs/${blogToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('A single blog is returned correctly...', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToGet = blogsInDb[0]

      const response = await api.get(`/api/blogs/${blogToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, blogToGet.title)
    })

    test('Fails with statuscode 400 if blog ID is malformed...', async () => {
      const invalidId = '1234'

      await api.get(`/api/blogs/${invalidId}`)
        .expect(400)
    })

    test('Fails with statuscode 404 if blog does not exist...', async () => {
      const validNonexistingBlogId = await helper.nonExistingBlogId()

      await api
        .get(`/api/blogs/${validNonexistingBlogId}`)
        .expect(404)
    })
  })

  // [POST] Route Tests (Create a new blog):
  describe('[POST /api/blogs] - Create a new blog:', () => {
    test('A new blog can be added and response is correct...', async () => {
      const newBlog = { ...helper.blogs[0] }
      delete newBlog._id
      delete newBlog.__v

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('A new blog can be added correctly...', async () => {
      const newBlog = { ...helper.blogs[0] }
      delete newBlog._id
      delete newBlog.__v

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.blogs.length + 1)
      assert.strictEqual(blogsInDb[blogsInDb.length - 1].title, newBlog.title)
    })

    test('Fails with status code 400 if new blog data is invalid...', async () => {
      const newBlog = { ...helper.blogs[0] }
      delete newBlog._id
      delete newBlog.__v
      delete newBlog.title

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsInDb = await helper.blogsInDb()

      assert.strictEqual(blogsInDb.length, helper.blogs.length)
    })
  })

  // [PUT] Route Tests (Update a blog):
  describe('[PUT /api/blogs/:id] - Update a blog:', () => {
    test('A blog can be updated and response is correct...', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToUpdate = blogsInDb[0]

      await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 101 })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('A blog can be updated correctly...', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToUpdate = blogsInDb[0]

      const originalLikes = blogToUpdate.likes

      const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: originalLikes + 1 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, originalLikes + 1)
    })

    test('Fails with status code 400 if blog ID is malformed...', async () => {
      const invalidId = '1234'

      await api.put(`/api/blogs/${invalidId}`)
        .send({ likes: 101 })
        .expect(400)
    })

    test('Fails with status code 404 if blog does not exist...', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.put(`/api/blogs/${validNonexistingId}`)
        .send({ likes: 101 })
        .expect(404)
    })
  })

  // [DELETE] Route Tests (Delete a blog):
  describe('[DELETE /api/blogs/:id] - Delete a blog:', () => {
    test('A blog can be deleted and response is correct...', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToDelete = blogsInDb[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    })

    test('A blog can be deleted correctly...', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToDelete = blogsInDb[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsInDbAfterDelete = await helper.blogsInDb()
      const titles = blogsInDbAfterDelete.map(r => r.title)

      assert.strictEqual(blogsInDbAfterDelete.length, blogsInDb.length - 1)
      assert.ok(!titles.includes(blogToDelete.title))
    })

    test('Fails with status code 400 if blog ID is malformed...', async () => {
      const invalidId = '1234'

      await api.delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })

    test('Fails with status code 404 if blog does not exist...', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.delete(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
  })

  // After All Tests:
  after(async () => {
    await mongoose.connection.close()
  })
})