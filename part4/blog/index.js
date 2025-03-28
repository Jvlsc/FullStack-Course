// Import the dotenv Module:
require('dotenv').config()

// Import the Express.js, Cors, Mongoose:
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// MongoDB Data:
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const cluster = process.env.MONGODB_CLUSTER
const database = process.env.MONGODB_DATABASE
const appName = process.env.MONGODB_APPNAME
const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority&appName=${appName}`

// MongoDB Schema:
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
})

// MongoDB Model:
const Blog = mongoose.model(process.env.MONGODB_MODEL, blogSchema)

// Express Instance:
const app = express()

// Middleware - Cors:
app.use(cors())

// Middleware - Json Parser:
app.use(express.json())

// [GET] Route - Get All Blogs:
app.get('/api/blogs', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => {
      console.log('[MongoDB] Error Fetching Blogs:', error.message)
      response.status(500).json({ error: 'Error Fetching Blogs' })
    })
})

// [POST] Route - Create a New Blog:
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      console.log('[MongoDB] Error Creating Blog:', error.message)
      response.status(500).json({ error: 'Error Creating Blog' })
    })
})

// MongoDB Connection:
console.log('[MongoDB] Connecting to MongoDB...')
mongoose.connect(url)
  .then(() => {
    console.log('[MongoDB] Connected to MongoDB')

    // Express Server:
    console.log('[Express] Starting server...')
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`[Express] Server running on port ${process.env.SERVER_PORT}`)
    })
  })
  .catch((error) => {
    console.log('[MongoDB] Error Connecting to MongoDB:', error.message)
    process.exit(1)
  })