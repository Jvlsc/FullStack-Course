// Import the Express.js, Cors, Mongoose:
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Import Controllers:
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const healthRouter = require('./controllers/health')

// Import Middlewares:
const errorHandler = require('./middlewares/errorHandler')
const requestLogger = require('./middlewares/requestLogger')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const tokenExtractor = require('./middlewares/tokenExtractor')

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
app.use(express.static('dist'))

// Middleware - Token Extractor:
app.use(tokenExtractor)

// Routes:
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/health', healthRouter)

// Routes - Testing:
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Middleware - Unknown Endpoint:
app.use(unknownEndpoint)

// Middleware - Error Handler:
app.use(errorHandler)

// Export the App:
module.exports = app
