// Book Type:
const bookType = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
`;

// Export the Book Type:
module.exports = bookType; 