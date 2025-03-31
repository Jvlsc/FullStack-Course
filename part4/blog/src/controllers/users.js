// Import the Express Router and Express-Async-Errors:
const usersRouter = require('express').Router()
require('express-async-errors')

// Import the Bcrypt Module:
const bcrypt = require('bcrypt')

// Import the User Model:
const User = require('../models/user')

// [GET] Route - Get All Users:
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1 })

  response.json(users)
})

// [GET] Route - Get a Single User:
usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id)
    .populate('blogs', { title: 1, author: 1, url: 1 })

  if (!user) {
    response.status(404).end()
  } else {
    response.json(user)
  }
})

// [POST] Route - Create a New User:
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter