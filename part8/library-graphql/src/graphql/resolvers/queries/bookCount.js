// Import Data:
const { booksTest } = require('../../../utils/data');

// Resolver:
const bookCount = () => booksTest.length;

// Export the Resolver:
module.exports = bookCount; 