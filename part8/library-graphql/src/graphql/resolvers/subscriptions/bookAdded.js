// Import PubSub:
const pubsub = require('../utils/pubsub')

// Book Added Subscription Resolver:
const bookAdded = {
  subscribe: () => {
    console.log('[GraphQL] Subscribing to "BOOK_ADDED" Event...')
    return pubsub.asyncIterableIterator(['BOOK_ADDED'])
  },
}

// Export Book Added Subscription Resolver:
module.exports = bookAdded
