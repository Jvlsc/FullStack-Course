// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Book = require('../../../models/book')

// Book Count Query Resolver:
const bookCount = async () => {
  try {
    console.log('[GraphQL] Fetching Book Count...')
    const books = await Book.find({})
    console.log('[GraphQL] Book Count Fetched Successfully!')
    return books.length
  } catch (error) {
    console.error(`[GraphQL] Error Fetching Book Count -> ${error.message}`)
    throw new GraphQLError(error.message, { 
      extensions: { code: 'INTERNAL_SERVER_ERROR' } 
    })
  }
}

// Export Book Count Query Resolver:
module.exports = bookCount; 