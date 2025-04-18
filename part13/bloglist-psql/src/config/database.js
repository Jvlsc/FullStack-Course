// Import Config:
const config = require('./config')

// Import Sequelize:
const { Sequelize } = require('sequelize')

// Import Logger:
const logger = require('../utils/logger')

// Sequelize Instance:
const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: (msg) => logger.info('[PostgreSQL]', msg)
})

// Connect to Database:
const connectToDatabase = async () => {
  try {
    logger.info('[PostgreSQL] Connecting to the Database...')
    await sequelize.authenticate()
    await sequelize.sync()
    logger.info('[PostgreSQL] Database Connected Successfully')
  } catch (error) {
    logger.error('[PostgreSQL] Unable to Connect to the Database:', error)
    await sequelize.close()
    process.exit(1)
  }
}

// Export Database Tools:
module.exports = { sequelize, connectToDatabase } 