// Query Type:
const queryType = `
  type Query {
    bookCount: Int!

    authorCount: Int!

    allBooks(author: String, genre: String): [Book!]!

    allAuthors: [Author!]!

    me: User
  }
`;

// Export the Query Type:
module.exports = queryType; 