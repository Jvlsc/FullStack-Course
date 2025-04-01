// Import the Express Router and Express-Async-Errors:
const loginRouter = require('express').Router()
require('express-async-errors')

// Import the JSON Web Token and Bcrypt:
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Import the User Model:
const User = require('../models/user')

// Import the Config Module:
const config = require('../utils/config')

// [POST] Route - Login:
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SERVER_SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

// Export the Login Router:
module.exports = loginRouter