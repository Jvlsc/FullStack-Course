// Import Data:
const { booksTest } = require('../../../utils/data');

// Resolver:
const allBooks = (root, args) => {
  if (args.author && args.genre) {
    return booksTest.filter(book => book.author === args.author && book.genres.includes(args.genre))
  }
  if (args.author) {
    return booksTest.filter(book => book.author === args.author)
  }
  if (args.genre) {
    return booksTest.filter(book => book.genres.includes(args.genre))
  }
  return booksTest
};

// Export the Resolver:
module.exports = allBooks; 