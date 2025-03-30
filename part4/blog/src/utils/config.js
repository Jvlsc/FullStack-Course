// Import the dotenv Module:
require('dotenv').config()

// Environment Variables - MongoDB Database:
const MONGODB_USER = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_USER : process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_PASSWORD : process.env.MONGODB_PASSWORD
const MONGODB_CLUSTER = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_CLUSTER : process.env.MONGODB_CLUSTER
const MONGODB_DATABASE = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_DATABASE : process.env.MONGODB_DATABASE
const MONGODB_APPNAME = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_APPNAME : process.env.MONGODB_APPNAME
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${MONGODB_APPNAME}`

// Environment Variables - MongoDB Blogs Collection:
const MONGODB_BLOGS_COLLECTION = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_BLOGS_COLLECTION : process.env.MONGODB_BLOGS_COLLECTION
const MONGODB_BLOGS_MODEL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_BLOGS_MODEL : process.env.MONGODB_BLOGS_MODEL

// Environment Variables - MongoDB Users Collection:
const MONGODB_USERS_COLLECTION = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_USERS_COLLECTION : process.env.MONGODB_USERS_COLLECTION
const MONGODB_USERS_MODEL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_USERS_MODEL : process.env.MONGODB_USERS_MODEL

// Environment Variables - Express Server:
const SERVER_PORT = process.env.NODE_ENV === 'test' ? process.env.TEST_SERVER_PORT : process.env.SERVER_PORT
const SERVER_SECRET = process.env.NODE_ENV === 'test' ? process.env.TEST_SERVER_SECRET : process.env.SERVER_SECRET

// Export the Config Module:
module.exports = {
  SERVER_PORT,
  SERVER_SECRET,
  MONGODB_URI,
  MONGODB_BLOGS_COLLECTION,
  MONGODB_BLOGS_MODEL,
  MONGODB_USERS_COLLECTION,
  MONGODB_USERS_MODEL
}