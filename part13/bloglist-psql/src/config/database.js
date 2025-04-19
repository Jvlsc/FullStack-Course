// Import Config:
const config = require('./config')

// Import Sequelize & Umzug:
const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

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
    await runMigrations()
    logger.info('[PostgreSQL] Database Connected Successfully')
  } catch (error) {
    logger.error('[PostgreSQL] Unable to Connect to the Database:', error)
    await sequelize.close()
    process.exit(1)
  }
}

// Migration Configuration:
const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}
  
// Run Migrations:
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

// Rollback Migrations:
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

// Export Sequelize Instance:
module.exports = { sequelize, connectToDatabase, runMigrations, rollbackMigration } 