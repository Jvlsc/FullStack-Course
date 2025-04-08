// Import Types:
const authorType = require('./types/author');
const bookType = require('./types/book');
const mutationType = require('./types/mutation');
const queryType = require('./types/query');

// Import Query Resolvers:
const bookCount = require('./resolvers/queries/bookCount');
const authorCount = require('./resolvers/queries/authorCount');
const allBooks = require('./resolvers/queries/allBooks');
const allAuthors = require('./resolvers/queries/allAuthors');

// Import Mutation Resolvers:
const addBook = require('./resolvers/mutations/addBook');
const editAuthor = require('./resolvers/mutations/editAuthor');

// Combine Types:
const typeDefs = `
  ${authorType}
  ${bookType}
  ${queryType}
  ${mutationType}
`;

// Combine Query Resolvers:
const queryResolvers = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors
};

// Combine Mutation Resolvers:
const mutationResolvers = {
  addBook,
  editAuthor
};

// Combine Resolvers:
const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers
};

// Export the GraphQL Schema and Resolvers
module.exports = {
  typeDefs,
  resolvers
}; 