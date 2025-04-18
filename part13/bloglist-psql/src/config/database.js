// Import Config:
const config = require('./config')

// Import Sequelize:
const { Sequelize } = require('sequelize')

// Sequelize Instance:
const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: (msg) => console.log('[PostgreSQL]', msg)
})

// Connect to Database:
const connectToDatabase = async () => {
  try {
    console.log('[PostgreSQL] Connecting to the Database...')
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('[PostgreSQL] Database Connected Successfully')
  } catch (error) {
    console.error('[PostgreSQL] Unable to Connect to the Database:', error)
    await sequelize.close()
    process.exit(1)
  }
}

// Export Database Tools:
module.exports = { sequelize, connectToDatabase } 