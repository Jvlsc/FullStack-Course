// Import Express:
const express = require('express')

// Import Routes:
const blogRoutes = require('./routes/blogRoutes')

// Import Middleware:
const requestLogger = require('./middlewares/requestLogger')

// Express Instance:
const app = express()

// Middleware - JSON Parser:
app.use(express.json())

// Middleware - Request Logger:
app.use(requestLogger)

// Setup Routes:
app.use('/api/blogs', blogRoutes)

// Export App:
module.exports = app