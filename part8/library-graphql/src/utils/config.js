// Import the dotenv Module:
require('dotenv').config()

// Environment Variables - MongoDB Database:
const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER
const MONGODB_DATABASE = process.env.MONGODB_DATABASE
const MONGODB_APPNAME = process.env.MONGODB_APPNAME
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${MONGODB_APPNAME}`

// Environment Variables - MongoDB Books Collection:
const MONGODB_BOOKS_COLLECTION = process.env.MONGODB_BOOKS_COLLECTION
const MONGODB_BOOKS_MODEL = process.env.MONGODB_BOOKS_MODEL

// Environment Variables - MongoDB Authors Collection:
const MONGODB_AUTHORS_COLLECTION = process.env.MONGODB_AUTHORS_COLLECTION
const MONGODB_AUTHORS_MODEL = process.env.MONGODB_AUTHORS_MODEL

// Environment Variables - Express Server:
const SERVER_PORT = process.env.SERVER_PORT
const SERVER_SECRET = process.env.SERVER_SECRET

// Export the Config Module:
module.exports = {
  SERVER_PORT,
  SERVER_SECRET,
  MONGODB_URI,
  MONGODB_BOOKS_COLLECTION,
  MONGODB_BOOKS_MODEL,
  MONGODB_AUTHORS_COLLECTION,
  MONGODB_AUTHORS_MODEL
}