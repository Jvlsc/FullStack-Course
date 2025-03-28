// Import the Express.js, Cors, Mongoose:
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Import Controllers:
const blogRouter = require('./controllers/blog')

// Import Middlewares:
const errorHandler = require('./middlewares/errorHandler')
const requestLogger = require('./middlewares/requestLogger')
const unknownEndpoint = require('./middlewares/unknownEndpoint')

// Import Utils:
const config = require('./utils/config')
const logger = require('./utils/logger')

// MongoDB Strict Query Disable:
mongoose.set('strictQuery', false)

// MongoDB Connection:
logger.info('[MongoDB] Connecting to MongoDB...')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('[MongoDB] Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('[MongoDB] Error Connecting to MongoDB:', error.message)
    process.exit(1)
  })

// Express Instance:
const app = express()

// Middleware - Cors:
app.use(cors())

// Middleware - Json Parser:
app.use(express.json())

// Middleware - Logger (Morgan):
app.use(requestLogger)

// Middleware - Static Files:
app.use(express.static('public'))

// Routes:
app.use('/api/blogs', blogRouter)

// Middleware - Unknown Endpoint:
app.use(unknownEndpoint)

// Middleware - Error Handler:
app.use(errorHandler)

// Export the App:
module.exports = app
