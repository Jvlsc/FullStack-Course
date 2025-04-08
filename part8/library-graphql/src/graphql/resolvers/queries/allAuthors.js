// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Author = require('../../../models/author')
const Book = require('../../../models/book')

// All Authors Query Resolver:
const allAuthors = async () => {   
  try {
    console.log('[GraphQL] Fetching All Authors...')

    // Get All Authors & Books:
    const authors = await Author.find({})
    const books = await Book.find({}).populate('author')

    // Add Book Count to Authors:
    const fixedAuthors = authors.map(author => ({
      ...author.toJSON(),
      bookCount: (books.filter(book => book.author.name === author.name).length || 0)
    }))

    // Return All Authors with Book Count:
    console.log('[GraphQL] All Authors Fetched Successfully!')
    return fixedAuthors

  } catch (error) {
    console.error(`[GraphQL] Error Fetching Authors -> ${error.message}`)
    throw new GraphQLError(error.message, { 
      extensions: { code: 'INTERNAL_SERVER_ERROR' } 
    })
  }
}

// Export All Authors Query Resolver:
module.exports = allAuthors; 