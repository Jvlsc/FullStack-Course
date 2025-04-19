// Import Sequelize:
const { Model, DataTypes } = require('sequelize')

// Import Sequelize Instance:
const { sequelize } = require('../config/database')

// User Model:
class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Username must be a valid email address'
      }
    }
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,  
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

// Export User Model:
module.exports = User