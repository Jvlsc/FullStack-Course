// Import Express Router and Async Errors:
const authorRouter = require('express').Router()
require('express-async-errors')

// Import Sequelize:
const { fn, col } = require('sequelize')

// Import Blog Model:
const { Blog } = require('../models')

// Import Logger:
const logger = require('../utils/logger')

// [GET] Get All Authors:
authorRouter.get('/', async (req, res) => {
  logger.info('[Express] Getting All Authors...')
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'articles'],
      [fn('SUM', col('likes')), 'likes']
    ],
    group: ['author'],
    order: [[fn('SUM', col('likes')), 'DESC']],
    raw: true
  })
  logger.info('[Express] Authors Fetched:', JSON.stringify(authors))
  res.json(authors)
})

// Export Author Routes:
module.exports = authorRouter 