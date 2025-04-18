// Import Blog Model:
const Blog = require('../models/blog')

// Import User Model:
const User = require('../models/user')

// Import the JSON Web Token:
const jwt = require('jsonwebtoken')

// Import the Config Module:
const config = require('../utils/config')

// Test Blogs Data:
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5a422a851b54a676234d17f8',
    comments: [
      {
        content: 'This is a great blog post!',
      },
      {
        content: 'I learned a lot from this post.',
      },
      {
        content: 'Super interesting!',
      },
      {
        content: 'Could use more examples, but overall very informative.',
      },
    ],
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5a422a851b54a676234d17f7',
    comments: [
      {
        content: 'I don\'t like this post.',
      },
      {
        content: 'This is a classic paper that changed programming forever.',
      },
      {
        content: 'A bit hard to understand for beginners, but worth the effort.',
      },
      {
        content: 'The arguments presented here are still relevant today.',
      },
    ],
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5a422a851b54a676234d17f8',
    comments: [
      {
        content: 'The mathematical approach is fascinating.',
      },
      {
        content: 'I would love to see more practical applications.',
      },
      {
        content: 'A bit too theoretical for my taste.',
      },
    ],
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5a422a851b54a676234d17f7',
    comments: [
      {
        content: 'Uncle Bob always delivers great insights about testing.',
      },
      {
        content: 'I disagree with some points, but it\'s thought-provoking.',
      },
      {
        content: 'The examples really helped me understand the concept.',
      },
    ],
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5a422a851b54a676234d17f8',
    comments: [
      {
        content: 'I strongly disagree with the main argument.',
      },
      {
        content: 'Interesting perspective, but I think TDD is still valuable.',
      },
      {
        content: 'The examples don\'t really support the conclusion.',
      },
    ],
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 12,
    user: '5a422a851b54a676234d17f8',
    comments: [],
    __v: 0,
  },
]

// Test Users Data:
const users = [
  {
    _id: '5a422a851b54a676234d17f8',
    username: 'root',
    name: 'Root User',
    passwordHash: '$2b$10$hEgfAhfxxcblC0WpShYUBupgppJH2y5yCzv.NDhtt9cytUVuiqTCa',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc',
    ],
    __v: 0,
  },
  {
    _id: '5a422a851b54a676234d17f7',
    username: 'testuser',
    name: 'Test User',
    passwordHash: '$2b$10$hEgfAhfxxcblC0WpShYUBupgppJH2y5yCzv.NDhtt9cytUVuiqTCa',
    blogs: [
      '5a422aa71b54a676234d17f8',
    ],
    __v: 0,
  },
]


// Populate Database with Test Blogs:
const cleanAndPopulateBlogsDB = async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
}

// Populate Database with Test Users:
const cleanAndPopulateUsersDB = async () => {
  await User.deleteMany({})
  await User.insertMany(users)
}

// Non Existing Blog ID:
const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: blogs[0].title,
    author: blogs[0].author,
    url: blogs[0].url,
    likes: blogs[0].likes,
    user: blogs[0].user
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// Non Existing User ID:
const nonExistingUserId = async () => {
  const user = new User({
    username: 'ghost',
    name: users[0].name,
    passwordHash: users[0].passwordHash
  })
  await user.save()
  await user.deleteOne()

  return user._id.toString()
}

// Blogs in Database:
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// Users in Database:
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// Get Token:
const getToken = async () => {
  const user = await User.findOne({ username: users[0].username })
  return jwt.sign({ id: user._id }, config.SERVER_SECRET)
}

// Export the Test Helper:
module.exports = {
  blogs,
  users,
  cleanAndPopulateBlogsDB,
  cleanAndPopulateUsersDB,
  nonExistingBlogId,
  nonExistingUserId,
  blogsInDb,
  usersInDb,
  getToken,
}
