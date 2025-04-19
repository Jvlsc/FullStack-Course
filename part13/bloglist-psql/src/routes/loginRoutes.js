// Import Express Router and Async Errors:
const loginRouter = require('express').Router()
require('express-async-errors')

// Import JWT and bcrypt:
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Import User Model:
const { User } = require('../models')

// Import Logger:
const logger = require('../utils/logger')

// Import Config:
const { SERVER_SECRET } = require('../config/config')

// [POST] Login:
loginRouter.post('/', async (request, response) => {
  logger.info('[Express] Logging In...')
  const { username, password } = request.body

  if (!username || !password) {
    logger.error('[Express] Missing Username or Password')
    return response.status(400).json({ error: 'Missing Username or Password' })
  }

  const user = await User.findOne({ where: { username: username }})

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    logger.error('[Express] Invalid Username or Password')
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = { username: user.username, id: user.id }
  const token = jwt.sign(userForToken, SERVER_SECRET, { expiresIn: 60*60 })

  logger.info('[Express] Login Successful')
  response.status(200).send({ name: user.name, username: user.username, token })
})

// Export Login Router:
module.exports = loginRouter