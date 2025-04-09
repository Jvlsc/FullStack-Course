// Import Mongoose:
const mongoose = require('mongoose')

// Import Unique Validator:
const uniqueValidator = require('mongoose-unique-validator')

// Import Config Module:
const config = require('../utils/config')

// User Database Schema:
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  passwordHash: {
    type:String,
    required: true
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
}, {
  collection: config.MONGODB_USERS_COLLECTION,
  timestamps: true
})

// Apply Unique Validator:
schema.plugin(uniqueValidator)

// Export User Model:
module.exports = mongoose.model(config.MONGODB_USERS_MODEL, schema)