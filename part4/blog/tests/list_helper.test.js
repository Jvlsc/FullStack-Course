// Imports Test Tools:
const { test, describe } = require('node:test')
const assert = require('node:assert')

// Import Blogs:
const { blogs } = require('../src/utils/test_helper')

// Import List Helper:
const listHelper = require('../src/utils/list_helper')

describe('TESTS - List Helper:', () => {
  // Tests - Dummy Function:
  describe('[Helper] - dummy Function:', () => {
    test('Returns always a value of 1...', () => {
      const result = listHelper.dummy(blogs)
      assert.strictEqual(result, 1)
    })
  })

  // Tests - Total Likes Function:
  describe('[Helper] - totalLikes Function:', () => {
    test('Returns the total number of likes in an empty list of blogs...', () => {
      const result = listHelper.totalLikes([])
      assert.strictEqual(result, 0)
    })

    test('Returns the total number of likes in a list of blogs with one blog...', () => {
      const result = listHelper.totalLikes([blogs[0]])
      assert.strictEqual(result, 7)
    })

    test('Returns the total number of likes in a list of blogs with multiple blogs...', () => {
      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, 46)
    })
  })

  // Tests - Favorite Blog Function:
  describe('[Helper] - favoriteBlog Function:', () => {
    test('Returns the favorite blog in an empty list of blogs...', () => {
      const result = listHelper.favoriteBlog([])
      assert.strictEqual(result, null)
    })

    test('Returns the favorite blog in a list of blogs with one blog...', () => {
      const result = listHelper.favoriteBlog([blogs[0]])
      assert.deepStrictEqual(result, blogs[0])
    })

    test('Returns the favorite blog in a list of blogs with multiple blogs...', () => {
      const result = listHelper.favoriteBlog(blogs)
      assert.deepStrictEqual(result, blogs[5])
    })
  })

  // Tests - Most Blogs Function:
  describe('[Helper] - mostBlogs Function:', () => {
    test('Returns the author with the most blogs in an empty list of blogs...', () => {
      const result = listHelper.mostBlogs([])
      assert.strictEqual(result, null)
    })

    test('Returns the author with the most blogs in a list of blogs with one blog...', () => {
      const result = listHelper.mostBlogs([blogs[0]])
      assert.deepStrictEqual(result, { author: 'Michael Chan', blogs: 1 })
    })

    test('Returns the author with the most blogs in a list of blogs with multiple blogs...', () => {
      const result = listHelper.mostBlogs(blogs)
      assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })
  })

  // Tests - Most Likes Function:
  describe('[Helper] - mostLikes Function:', () => {
    test('Returns the author with the most likes in an empty list of blogs...', () => {
      const result = listHelper.mostLikes([])
      assert.strictEqual(result, null)
    })

    test('Returns the author with the most likes in a list of blogs with one blog...', () => {
      const result = listHelper.mostLikes([blogs[0]])
      assert.deepStrictEqual(result, { author: 'Michael Chan', likes: 7 })
    })

    test('Returns the author with the most likes in a list of blogs with multiple blogs...', () => {
      const result = listHelper.mostLikes(blogs)
      assert.deepStrictEqual(result, { author: 'Robert C. Martin', likes: 22 })
    })
  })
})
