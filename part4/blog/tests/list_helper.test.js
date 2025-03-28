// Imports Test Tools:
const { test, describe } = require('node:test')
const assert = require('node:assert')

// Import List Helper:
const listHelper = require('../src/utils/list_helper')

// Test Blogs:
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12,
    __v: 0,
  },
]

// Tests - Dummy Function:
describe('Tests - dummy Function:', () => {
  test('Returns one always...', () => {
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

// Tests - Total Likes Function:
describe('Tests - totalLikes Function:', () => {
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
describe('Tests - favoriteBlog Function:', () => {
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
describe('Tests - mostBlogs Function:', () => {
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
