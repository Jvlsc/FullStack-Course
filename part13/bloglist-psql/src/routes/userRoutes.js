// Import Express Router and Async Errors:
const userRouter = require('express').Router()
require('express-async-errors')

// Import bcrypt:
const bcrypt = require('bcrypt')

// Import User Model:
const { User, Blog } = require('../models')

// Import Logger:
const logger = require('../utils/logger')

// [GET] Get All Users:
userRouter.get('/', async (req, res) => {
  logger.info('[Express] Getting All Users...')
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  logger.info('[Express] Users Fetched:', JSON.stringify(users))
  res.json(users)
})

// [POST] Create User:
userRouter.post('/', async (req, res) => {
  logger.info('[Express] Creating User...')
  const { username, name, password } = req.body

  if (!username || !name || !password) {
    logger.error('[Express] Missing Required Fields')
    return res.status(400).json({ error: 'Missing Required Fields' })
  }

  if (password.length < 3 || password.length > 100) {
    logger.error('[Express] Invalid Password Length')
    return res.status(400).json({ error: 'Password must be between 3 and 100 characters long' })
  }

  const saltRounds = 10 
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({ username, name, passwordHash })
  logger.info('[Express] User Created:', JSON.stringify(user))
  res.json(user)
})

// [PUT] Update User:
userRouter.put('/:username', async (req, res) => {
  logger.info('[Express] Updating User...')
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    logger.info('[Express] User Found')
    const updatedUser = await user.update({ username: req.body.username })
    logger.info('[Express] User Updated:', JSON.stringify(updatedUser))
    res.json(updatedUser)
  } else {
    logger.error('[Express] User Not Found')
    res.status(404).end()
  }
})

// [DELETE] Delete User:
userRouter.delete('/:username', async (req, res) => {
  logger.info('[Express] Deleting User...')
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    logger.info('[Express] User Found')
    await user.destroy()
    logger.info('[Express] User Deleted')
    res.status(204).end()
  } else {
    logger.error('[Express] User Not Found')
    res.status(404).end()
  }
})

// Export User Routes:
module.exports = userRouter