// Mutation Type:
const mutationType = `
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      name: String!
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    loginUser(
      username: String!
      password: String!
    ): Token
  }
`;

// Export the Mutation Type:
module.exports = mutationType; 