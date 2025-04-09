// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Bcrypt:
const bcrypt = require('bcrypt')

// Import User Model:
const User = require('../../../models/user')

// Import Error Handler:
const { handleValidationError } = require('../utils/errorHandler')

// Create User Mutation Resolver:
const createUser = async (root, args) => {
  try {
    console.log(`[GraphQL] Creating User '${args.username}'...`)

    // Hash Password:
    const saltRounds = 10
    const password = args.password
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create User:
    const user = new User({
      name: args.name,
      username: args.username,
      passwordHash,
      favoriteGenre: args.favoriteGenre
    })

    // Save User & Return:
    const userCreated = await user.save()
    console.log(`[GraphQL] User '${args.username}' Created Successfully!`)
    return userCreated

  } catch (error) {
    console.error(`[GraphQL] Error Creating User -> ${error.message}`)

    // Handle Validation Errors:
    const errorMessage = error.name === 'ValidationError' 
      ? handleValidationError(error)
      : error.message

    // Throw Error:
    throw new GraphQLError(errorMessage, {
      extensions: { 
        code: 'BAD_USER_INPUT',
        invalidArgs: args 
      }
    })
  }
}

// Export Create User Mutation Resolver:
module.exports = createUser