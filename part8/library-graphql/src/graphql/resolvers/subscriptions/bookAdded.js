// Book Added Subscription Resolver:
const bookAdded = {
  bookAdded: {
    subscribe: () => {
      console.log('[GraphQL] Subscribing to Book Added Event...')
      return pubsub.asyncIteratorIterable(['BOOK_ADDED'])
    },
  },
}

// Export Book Added Subscription Resolver:
module.exports = bookAdded
