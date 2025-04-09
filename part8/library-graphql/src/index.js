// Import Apollo Server Tools, Schema and Resolvers:
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { typeDefs, resolvers } = require('./graphql')

// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose & Models:
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

// Import JSON Web Token:
const jwt = require('jsonwebtoken')

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
    startStandaloneServer(server, { 
      listen: { port: config.SERVER_PORT },
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(auth.replace('Bearer ', ''), config.SERVER_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
          } catch (error) {
            console.error('[GraphQL] Error Verifying Token -> ', error.message)

            if (error.name === 'JsonWebTokenError') {
              throw new GraphQLError('Invalid Token.', { extensions: { code: 'UNAUTHENTICATED' } })
            }

            if (error.name === 'TokenExpiredError') {
              throw new GraphQLError('Expired Token. Try logging in again.', { extensions: { code: 'UNAUTHENTICATED' } })
            }
          }
        }
      }
    })
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