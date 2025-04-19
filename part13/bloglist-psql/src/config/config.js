// Import Dotenv:
require('dotenv').config()

// Export Config:
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  SERVER_PORT: process.env.SERVER_PORT || 3001,
  SERVER_SECRET: process.env.SERVER_SECRET
}