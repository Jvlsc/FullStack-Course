// Import the dotenv Module:
require('dotenv').config()

// Environment Variables - MongoDB Data:
const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER
const MONGODB_DATABASE = process.env.MONGODB_DATABASE
const MONGODB_MODEL = process.env.MONGODB_MODEL
const MONGODB_APPNAME = process.env.MONGODB_APPNAME
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${MONGODB_APPNAME}`

// Environment Variables - Express Server:
const SERVER_PORT = process.env.SERVER_PORT

// Export the Config Module:
module.exports = { SERVER_PORT, MONGODB_URI, MONGODB_MODEL }