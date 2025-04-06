// Import the Mongoose Module:
const mongoose = require('mongoose')

// Import the Config Module:
const config = require('../utils/config')

// MongoDB Schema:
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.MONGODB_USERS_MODEL,
    required: true
  },
  comments: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  }
}, {
  collection: config.MONGODB_BLOGS_COLLECTION,
  timestamps: true
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
module.exports = mongoose.model(config.MONGODB_BLOGS_MODEL, blogSchema)