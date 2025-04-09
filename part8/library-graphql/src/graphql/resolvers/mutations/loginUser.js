// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import bcrypt:
const bcrypt = require('bcrypt')

// Import JWT:
const jwt = require('jsonwebtoken')

// Import User Model:
const User = require('../../../models/user')

// Import Config Module:
const config = require('../../../utils/config')

// Login User Mutation Resolver:
const loginUser = async (root, args) => {
  try {
    console.log(`[GraphQL] Logging In User '${args.username}'...`)

    // Find User:
    const user = await User.findOne({ username: args.username })

    // Check Password:
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(args.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      console.log('[GraphQL] Username or Password is incorrect')
      throw new GraphQLError('Username or Password is incorrect', { 
        extensions: { 
          code: 'BAD_USER_INPUT', 
          invalidArgs: args 
        }
      })
    }

    // Generate & Return Token:
    const tokenData = { username: user.username, id: user._id }
    const token = jwt.sign(tokenData, config.SERVER_SECRET, { expiresIn: 60 * 60 })
    console.log(`[GraphQL] Login Successful for '${user.username}'`)
    return { value: token }

  } catch (error) {
    console.error(`[GraphQL] Error Logging In -> ${error.message}`)
    throw new GraphQLError(error.message, {
      extensions: { 
        code: 'BAD_USER_INPUT', 
        invalidArgs: args 
      }
    })
  }
}

// Export Login User Mutation Resolver:
module.exports = loginUser