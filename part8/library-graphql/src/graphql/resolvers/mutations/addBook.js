// Import PubSub:
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Author = require('../../../models/author')
const Book = require('../../../models/book')

// Import Utils - Error Handler:
const { handleValidationError } = require('../utils/errorHandler')

// Add Book Mutation Resolver:
const addBook = async (root, args, context) => {
  try {
    console.log('[GraphQL] Adding Book...')

    if (!context.currentUser) {
      throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } })
    }

    // Check if Author Exists:
    const authors = await Author.find({})
    let author = authors.find(author => author.name === args.author)
    if (!author) {
      console.log(`[GraphQL] Author not found, creating '${args.author}' author...`)
      author = new Author({ name: args.author, born: null })
      await author.save()
    }

    // Create New Book:
    console.log(`[GraphQL] Creating '${args.title}' Book...`)
    const newBook = new Book({ ...args, author: author._id })
    const savedBook = await newBook.save()
    
    // Populate Saved Book:
    await savedBook.populate('author')
    console.log(`[GraphQL] '${args.title}' Book Created Successfully!`)

    // Publish Book Added Event:
    console.log('[GraphQL] Publishing Book Added Event...')
    pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

    // Return Saved Book:
    return savedBook

  } catch (error) {
    console.error(`[GraphQL] Error Adding '${args.title}'`, error.message)

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
};

// Export Add Book Mutation Resolver:
module.exports = addBook; 