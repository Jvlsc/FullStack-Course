// Importing Mongoose:
const mongoose = require('mongoose')

// Import the Config Module:
const config = require('../utils/config')

// Defining the User Schema:
const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.MONGODB_BLOGS_MODEL
    }
  ]
}, {
  collection: config.MONGODB_USERS_COLLECTION,
  timestamps: true
})

// Setting the toJSON Transformer:
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// Exporting the User Model:
module.exports = mongoose.model(config.MONGODB_USERS_MODEL, userSchema)