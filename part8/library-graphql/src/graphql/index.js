// Import Types:
const basicTypes = require('./types/basic');
const mutationTypes = require('./types/mutation');
const queryTypes = require('./types/query');
const subscriptionTypes = require('./types/subscription');

// Import Query Resolvers:
const bookCount = require('./resolvers/queries/bookCount');
const authorCount = require('./resolvers/queries/authorCount');
const allBooks = require('./resolvers/queries/allBooks');
const allAuthors = require('./resolvers/queries/allAuthors');
const me = require('./resolvers/queries/me');

// Import Mutation Resolvers:
const addBook = require('./resolvers/mutations/addBook');
const editAuthor = require('./resolvers/mutations/editAuthor');
const createUser = require('./resolvers/mutations/createUser');
const loginUser = require('./resolvers/mutations/loginUser');

// Import Subscription Resolvers:
const bookAdded = require('./resolvers/subscriptions/bookAdded');

// Combine Types:
const typeDefs = `
  ${basicTypes}
  ${queryTypes}
  ${mutationTypes}
  ${subscriptionTypes}
`;

// Combine Query Resolvers:
const queryResolvers = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,
  me
};

// Combine Mutation Resolvers:
const mutationResolvers = {
  addBook,
  editAuthor,
  createUser,
  loginUser
};

// Combine Subscription Resolvers:
const subscriptionResolvers = {
  bookAdded
};

// Combine Resolvers:
const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers
};

// Export the GraphQL Schema and Resolvers
module.exports = {
  typeDefs,
  resolvers
}; 