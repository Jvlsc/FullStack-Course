// Import Mongoose:
const mongoose = require('mongoose')

// Import Unique Validator:
const uniqueValidator = require('mongoose-unique-validator')

// Import Config Module:
const config = require('../utils/config')

// Book Database Schema:
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

// Apply Unique Validator:
schema.plugin(uniqueValidator)

// Transform the Book Schema:
schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export the Book Model:
module.exports = mongoose.model(config.MONGODB_BOOKS_MODEL, schema)