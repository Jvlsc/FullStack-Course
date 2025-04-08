// Import Data:
const { booksTest, authorsTest } = require('../../../utils/data');

// Resolver:
const allAuthors = () => authorsTest.map(author => ({
  ...author,
  bookCount: booksTest.filter(book => book.author === author.name).length
}));

// Export the Resolver:
module.exports = allAuthors; 