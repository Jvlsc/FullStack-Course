require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: (msg) => console.log('[PostgreSQL]', msg)
})

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

module.exports = { sequelize, connectToDatabase } 