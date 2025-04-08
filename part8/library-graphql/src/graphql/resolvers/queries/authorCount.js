// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Author = require('../../../models/author')

// Author Count Query Resolver:
const authorCount = async () => {
  try {
    console.log('[GraphQL] Fetching Author Count...')
    const authors = await Author.find({})
    console.log('[GraphQL] Author Count Fetched Successfully!')
    return authors.length
  } catch (error) { 
    console.error(`[GraphQL] Error Fetching Author Count -> ${error.message}`)
    throw new GraphQLError(error.message, { 
      extensions: { code: 'INTERNAL_SERVER_ERROR' } 
    })
  }
}

// Export Author Count Query Resolver:
module.exports = authorCount; 