// Imports Test Tools:
const { test, describe } = require('node:test')
const assert = require('node:assert')

// Import List Helper:
const listHelper = require('../src/utils/list_helper')

// Tests - Dummy Function:
describe('dummy Tests', () => {
  test('returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

