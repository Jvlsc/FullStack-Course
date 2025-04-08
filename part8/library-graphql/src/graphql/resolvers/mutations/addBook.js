// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Author = require('../../../models/author')
const Book = require('../../../models/book')

// Add Book Resolver:
const addBook = async (root, args) => {
  try {
    console.log('[GraphQL] Adding Book...')

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
    console.log(`[GraphQL] '${args.title}' Book Created Successfully!`)

    // Populate Saved Book:
    await savedBook.populate('author')

    // Return Saved Book:
    return savedBook

  } catch (error) {
    console.error(`[GraphQL] Error Adding '${args.title}' -> ${error.message}`)
    throw new GraphQLError(error.message, { 
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args 
      } 
    })
  }
};

// Export Add Book Resolver:
module.exports = addBook; 