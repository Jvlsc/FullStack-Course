// Import Express:
const express = require('express')

// Import Routes:
const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authorRoutes = require('./routes/authorRoutes')

// Import Middleware:
const requestLogger = require('./middlewares/requestLogger')
const errorHandler = require('./middlewares/errorHandler')

// Express Instance:
const app = express()

// Middlewares - JSON Parser & Request Logger:
app.use(express.json())
app.use(requestLogger)

// Setup Routes:
app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/authors', authorRoutes)

// Middleware - Error Handler:
app.use(errorHandler)

// Export App:
module.exports = app