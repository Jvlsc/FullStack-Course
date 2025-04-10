// Import Apollo Server Tools, Schema and Resolvers:
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { WebSocketServer } = require('ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { useServer } = require('graphql-ws/use/ws');
const { GraphQLError } = require('graphql')
const { typeDefs, resolvers } = require('./graphql')

// Import Express & Cors & HTTP:
const express = require('express')
const cors = require('cors')
const http = require('http')

// Import JSON Web Token:
const jwt = require('jsonwebtoken')

// Import Mongoose Models:
const User = require('./models/user')

// Import Config Module:
const config = require('./utils/config')

// Start Apollo Server:
const startApolloServer = async () => {
  // Create Express App:
  const app = express()
  const httpServer = http.createServer(app)

  // Create WebSocket Server:
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  // WebSocketServer Start Listening:
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer);

  // Create Apollo Server with WebSocket Support:
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper Shutdown for HTTP Server:
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper Shutdown for WebSocket Server:
      { 
        async serverWillStart() { 
          return { 
            async drainServer() { 
              await serverCleanup.dispose(); 
            } 
          } 
        } 
      },
    ],
  })

  // Start Apollo Server:
  await server.start()

  // Express Middlewares:
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(auth.replace('Bearer ', ''), config.SERVER_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
          } catch (error) {
            console.error('[GraphQL] Error Verifying Token -> ', error.message)
          }
        }
      }
    }),
  )

  // Start HTTP Server:
  httpServer.listen(config.SERVER_PORT, () =>
    console.log(`[Apollo] Server is Running: http://localhost:${config.SERVER_PORT}`)
  )
}

// Export Start Function:
module.exports = { startApolloServer }