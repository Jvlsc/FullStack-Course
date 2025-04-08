// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Book = require('../../../models/book')

// All Books Query Resolver:
const allBooks = async (root, args) => {
  try {
    console.log('[GraphQL] Fetching All Books...')

    // Get All Books Populated:
    let books = await Book.find({}).populate('author')

    // Filters by Author & Genre:
    if (args.author) books = books.filter(book => book.author.name === args.author)
    if (args.genre) books = books.filter(book => book.genres.includes(args.genre))

    // Return Filtered Books:
    console.log('[GraphQL] All Books Fetched Successfully!')
    return books

  } catch (error) {
    console.error(`[GraphQL] Error Fetching Books -> ${error.message}`)
    throw new GraphQLError(error.message, { 
      extensions: { code: 'INTERNAL_SERVER_ERROR' } 
    })
  }
};

// Export All Books Query Resolver:
module.exports = allBooks; 