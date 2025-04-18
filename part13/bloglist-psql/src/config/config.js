// Import Dotenv:
require('dotenv').config()

// Export Config:
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  SERVER_PORT: process.env.SERVER_PORT || 3001,
}