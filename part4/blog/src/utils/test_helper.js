// Import Blog Model:
const Blog = require('../models/blog')

// Import User Model:
const User = require('../models/user')

// Test Blogs Data:
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

// Test Users Data:
const users = [
  {
    _id: '5a422a851b54a676234d17f8',
    username: 'root',
    name: 'Root User',
    passwordHash: 'rootpasswordhash',
    blogs: [],
    __v: 0,
  },
  {
    _id: '5a422a851b54a676234d17f7',
    username: 'testuser',
    name: 'Test User',
    passwordHash: 'testpasswordhash',
    blogs: [],
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
const nonExistingId = async () => {
  const blog = new Blog({
    title: blogs[0].title,
    author: blogs[0].author,
    url: blogs[0].url,
    likes: blogs[0].likes,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// Non Existing User ID:
const nonExistingUserId = async () => {
  const user = new User({
    username: users[0].username,
    name: users[0].name,
    passwordHash: users[0].passwordHash,
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

// Export the Test Helper:
module.exports = {
  blogs,
  users,
  cleanAndPopulateBlogsDB,
  cleanAndPopulateUsersDB,
  nonExistingId,
  nonExistingUserId,
  blogsInDb,
  usersInDb,
}
