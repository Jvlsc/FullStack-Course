// Import Test Tools:
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('../src/utils/test_helper')

// Import User Model:
const User = require('../src/models/user')

// Import Config:
const config = require('../src/utils/config')

// Import Mongoose:
const mongoose = require('mongoose')

// User Model Tests:
describe('TESTS - User Model:', () => {
  // Before Each Test:
  beforeEach(async () => {
    await mongoose.connect(config.MONGODB_URI)
    await User.deleteMany({})
  })

  test('Check if the unique identifier property of the users is named id...', async () => {
    const user = new User(helper.users[0])
    const savedUser = await user.save()
    const userJson = savedUser.toJSON()

    assert.strictEqual(userJson.id, helper.users[0]._id.toString())
    assert.strictEqual(userJson._id, undefined)
  })

  test('Check if a single user is saved correctly...', async () => {
    const user = new User(helper.users[0])
    const savedUser = await user.save()
    const userJson = savedUser.toJSON()

    assert.strictEqual(userJson.username, helper.users[0].username)
  })

  test('Check if multiple users are saved correctly...', async () => {
    await User.insertMany(helper.users)
    const users = await User.find({})
    const usersJson = users.map(user => user.toJSON())

    assert.strictEqual(usersJson.length, helper.users.length)
    assert.strictEqual(usersJson[0].username, helper.users[0].username)
    assert.strictEqual(usersJson[1].username, helper.users[1].username)
  })

  // After All Tests:
  after(async () => {
    await mongoose.connection.close()
  })
})