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
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: /^[a-zA-Z0-9._-]+$/,
        msg: 'Username can only contain letters, numbers, dots, hyphens and underscores'
      }
    }
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
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