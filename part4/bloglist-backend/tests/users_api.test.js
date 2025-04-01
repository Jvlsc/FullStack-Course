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

// Users HTTP API Tests:
describe('TESTS - Users HTTP API:', () => {
  // Before Each Test:
  beforeEach(async () => {
    await helper.cleanAndPopulateUsersDB()
  })

  // [GET] Route Tests (All Users):
  describe('[GET /api/users] - Get All Users:', () => {
    test('All users are returned correctly as JSON...', async () => {
      await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('All users are returned correctly...', async () => {
      const response = await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.users.length)
    })

    test('A specific user is within the returned users...', async () => {
      const response = await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usernames = response.body.map(user => user.username)

      assert.ok(usernames.includes(helper.users[0].username))
    })
  })

  // [GET] Route Tests (Get Single User):
  describe('[GET /api/users/:id] - Get a Single User:', () => {
    test('A single user request response is correct...', async () => {
      const usersInDb = await helper.usersInDb()
      const userToGet = usersInDb[0]

      await api.get(`/api/users/${userToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('A single user is returned correctly...', async () => {
      const usersInDb = await helper.usersInDb()
      const userToGet = usersInDb[0]

      const response = await api.get(`/api/users/${userToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.username, userToGet.username)
    })

    test('Fails with statuscode 400 if user ID is malformed...', async () => {
      const invalidId = '1234'

      await api.get(`/api/users/${invalidId}`)
        .expect(400)
    })

    test('Fails with statuscode 404 if user does not exist...', async () => {
      const validNonexistingUserId = await helper.nonExistingUserId()

      await api
        .get(`/api/users/${validNonexistingUserId}`)
        .expect(404)
    })
  })

  // [POST] Route Tests (Create a new user):
  describe('[POST /api/users] - Create a new user:', () => {
    test('A new user can be added and response is correct...', async () => {
      const newUser = {
        username: 'ghost',
        name: helper.users[0].name,
        password: helper.users[0].passwordHash
      }

      await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('A new user can be added correctly...', async () => {
      const newUser = {
        username: 'ghost',
        name: helper.users[0].name,
        password: helper.users[0].passwordHash
      }

      await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersInDb = await helper.usersInDb()

      assert.strictEqual(usersInDb.length, helper.users.length + 1)
      assert.strictEqual(usersInDb[usersInDb.length - 1].name, newUser.name)
    })

    test('Fails with status code 400 if new user data is invalid...', async () => {
      const newUser = {
        username: helper.users[0].username,
        password: helper.users[0].passwordHash
      }

      await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersInDb = await helper.usersInDb()

      assert.strictEqual(usersInDb.length, helper.users.length)
    })

    test('Fails with status code 400 if new username is not unique...', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: helper.users[0].username,
        name: helper.users[0].name,
        password: helper.users[0].passwordHash
      }

      const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(response.body.error.includes('expected `username` to be unique'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Fails with status code 400 if new username is not at least 3 characters long...', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ab',
        name: helper.users[0].name,
        password: helper.users[0].passwordHash
      }

      const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(response.body.error.includes('User validation failed'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Fails with status code 400 if new password is not provided or is less than 3 characters long...', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ghost',
        name: helper.users[0].name,
        password: ''
      }

      const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(response.body.error.includes('password must be at least 3 characters long'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

  // After All Tests:
  after(async () => {
    await mongoose.connection.close()
  })
})