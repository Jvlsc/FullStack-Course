// Import Mongoose:
const mongoose = require('mongoose')

// Import Unique Validator:
const uniqueValidator = require('mongoose-unique-validator')

// Import Config Module:
const config = require('../utils/config')

// Author Database Schema:
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

// Apply Unique Validator:
schema.plugin(uniqueValidator)

// Transform the Author Schema:
schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.bookCount = returnedObject.bookCount || 0
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export the Author Model:
module.exports = mongoose.model(config.MONGODB_AUTHORS_MODEL, schema)