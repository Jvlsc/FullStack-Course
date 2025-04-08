// Import Data:
const { authorsTest } = require('../../../utils/data');

// Resolver:
const editAuthor = (root, args) => {
  const author = authorsTest.find(author => author.name === args.name)
  if (!author) {
    return null
  }
  const updatedAuthor = { ...author, born: args.setBornTo }
  authorsTest = authorsTest.map(a => a.name === args.name ? updatedAuthor : a)
  return updatedAuthor
};

// Export the Resolver:
module.exports = editAuthor; 