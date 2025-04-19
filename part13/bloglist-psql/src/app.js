// Import Express:
const express = require('express')

// Import Routes:
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')

// Import Middleware:
const requestLogger = require('./middlewares/requestLogger')
const errorHandler = require('./middlewares/errorHandler')

// Express Instance:
const app = express()

// Middlewares - JSON Parser & Request Logger:
app.use(express.json())
app.use(requestLogger)

// Setup Routes:
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

// Middleware - Error Handler:
app.use(errorHandler)

// Export App:
module.exports = app