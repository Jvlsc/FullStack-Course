// Import GraphQL Error:
const { GraphQLError } = require('graphql')

// Import Mongoose Models:
const Author = require('../../../models/author')

// Edit Author Mutation Resolver:
const editAuthor = async (root, args) => {
  try {
    console.log(`[GraphQL] Editing Author '${args.name}'...`)

    // Find Author:
    const author = await Author.findOne({ name: args.name })
    if (!author) {
      console.log(`[GraphQL] Author '${args.name}' Not Found!`)
      return null
    }

    // Update & Save Author:
    author.born = args.setBornTo
    const updatedAuthor = await author.save()

    // Return Updated Author:
    console.log(`[GraphQL] Author '${args.name}' Updated Successfully!`)
    return updatedAuthor

  } catch (error) {
    console.error(`[GraphQL] Error Editing '${args.name}' Author -> ${error.message}`)
    throw new GraphQLError(error.message, { 
      extensions: { code: 'BAD_USER_INPUT', invalidArgs: args } 
    })
  }
};

// Export Edit Author Mutation Resolver:
module.exports = editAuthor; 