// Importing the mongoose Module:
const mongoose = require('mongoose')

// MongoDB Data:
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const cluster = process.env.MONGODB_CLUSTER
const database = process.env.MONGODB_DATABASE
const collection = process.env.MONGODB_COLLECTION
const model = process.env.MONGODB_MODEL
const appName = process.env.MONGODB_APPNAME
const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority&appName=${appName}`

// MongoDB - Person Schema:
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        // Check if the number only contains one hyphen:
        if (!v.includes('-')) return false
        const parts = v.split('-')
        if (parts.length !== 2) return false

        // Check if both parts contain only numbers:
        if (!/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1])) return false

        // Check if first part contains only 2 or 3 numbers:
        if (parts[0].length < 2 || parts[0].length > 3) return false

        return true
      },
      message: props => `${props.value} is not a valid phone number! Must be in format XX-XXXXXXX or XXX-XXXXXXXX`
    },
    required: [true, 'Phone number is required']
  }
})

// MongoDB - Person Schema to JSON:
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// MongoDB - Strict Query Disabled:
mongoose.set('strictQuery', false)

// MongoDB - Connecting to the Database:
console.log('[MongoDB] Connecting to MongoDB...')
mongoose.connect(url)
  .then(() => {
    console.log('[MongoDB] Connected to MongoDB')
  })
  .catch(error => {
    console.log(`[MongoDB] Error Connecting to MongoDB: ${error.message}`)
  })

// Exporting the MongoDB - Person Model:
module.exports = mongoose.model(model, personSchema, collection)