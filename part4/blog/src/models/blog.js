// Import the Mongoose Module:
const mongoose = require('mongoose')

// Import the Config Module:
const config = require('../utils/config')

// MongoDB Schema:
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
})

// Transform the Blog Schema:
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export the Blog Model:
module.exports = mongoose.model(config.MONGODB_MODEL, blogSchema)