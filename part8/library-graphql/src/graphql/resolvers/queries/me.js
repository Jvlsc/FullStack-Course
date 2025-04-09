// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Me Query Resolver:
const me = async (root, args, context) => {
  try {
    console.log('[GraphQL] Fetching Current User...')
    if (!context.currentUser) {
      throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } })
    }
    console.log('[GraphQL] Current User:', context.currentUser.username)
    return context.currentUser
  } catch (error) {
    console.error(`[GraphQL] Error Fetching Current User -> ${error.message}`)
    throw new GraphQLError(error.message, { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
  }
}

// Export Me Query Resolver:
module.exports = me


