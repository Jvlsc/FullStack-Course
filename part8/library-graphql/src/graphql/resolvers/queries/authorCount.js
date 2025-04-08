// Import Data:
const { authorsTest } = require('../../../utils/data');

// Resolver:
const authorCount = () => authorsTest.length;

// Export the Resolver:
module.exports = authorCount; 