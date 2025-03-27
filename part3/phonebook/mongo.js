// Importing the mongoose Module:
const mongoose = require('mongoose')

// Check if the password is provided as an argument:
if (process.argv.length < 3 || process.argv.length > 5 || process.argv.length === 4) {
  console.log('Usage: node mongo.js <password> [name] [number]')
  process.exit(1)
}

// MongoDB - User:
const user = 'onlineregisters'

// MongoDB - User Password:
const password = process.argv[2]

// MongoDB - Application Name:
const appName = 'Cluster0'

// MongoDB - Cluster:
const cluster = 'cluster0.6ewvyzg'

// MongoDB - Database:
const database = 'phonebook'

// MongoDB - Database Collection:
const collection = 'people'

// MongoDB - Database Model:
const model = 'Person'

// MongoDB - Database URL:
const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority&appName=${appName}`

// MongoDB - Strict Query Disabled:
mongoose.set('strictQuery', false)

// Connect to the MongoDB Database:
mongoose.connect(url)
  .then(() => {
    // Define the Person Schema:
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })

    // Create the Person Model:
    const Person = mongoose.model(model, personSchema, collection)

    // If only password is provided, list all entries
    if (process.argv.length === 3) {
      console.log('Phonebook:')
      Person.find({})
        .then(result => {
          result.forEach(person => console.log(`${person.name} ${person.number}`))
          mongoose.connection.close()
        })
        .catch(error => {
          console.error('Error fetching persons:', error)
          mongoose.connection.close()
        })
    }
    // If name and number are provided, add new entry
    else if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })
      person.save()
        .then(() => {
          console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
          mongoose.connection.close()
        })
        .catch(error => {
          console.error('Error adding person:', error)
          mongoose.connection.close()
        })
    }
    // If wrong number of arguments
    else {
      console.log('Usage: node mongo.js <password> [name] [number]')
      mongoose.connection.close()
    }
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  })