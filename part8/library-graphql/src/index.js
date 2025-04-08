// Import Apollo Server Tools, Schema and Resolvers:
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { typeDefs, resolvers } = require('./graphql')

// Import Mongoose & Models:
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

// Import Config Module:
const config = require('./utils/config')

// Connect to MongoDB:
console.log('[MongoDB] Connecting to MongoDB')
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('[MongoDB] Connected to MongoDB')

    // Create Apollo Server:
    console.log('[Apollo] Creating Apollo Server')
    const server = new ApolloServer({ typeDefs, resolvers })

    // Start Apollo Server:
    startStandaloneServer(server, { listen: { port: config.SERVER_PORT } })
      .then(({ url }) => { 
        console.log(`[Apollo] Server Ready: ${url}`)
      })
      .catch((err) => { 
        console.error('[Apollo] Error starting Apollo Server:', err)
        mongoose.connection.close()
        process.exit(1)
      })
  })
  .catch((error) => {
    console.log('[MongoDB] Error connecting to MongoDB:', error.message)
    process.exit(1)
  })