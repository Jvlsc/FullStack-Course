// Query Type:
const queryType = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

// Export the Query Type:
module.exports = queryType; 