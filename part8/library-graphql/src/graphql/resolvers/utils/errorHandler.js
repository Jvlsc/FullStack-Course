// Validation Error Messages
const ERROR_MESSAGES = {
  AUTHOR: {
    DUPLICATE: 'Author already exists in Library',
    MIN_LENGTH: 'Author name must be at least 4 characters long'
  },
  BOOK: {
    DUPLICATE: 'Book already exists in Library',
    MIN_LENGTH: 'Book title must be at least 5 characters long'
  }
}

// Helper function to handle validation errors
const handleValidationError = (error) => {
  const message = error.message
  
  // Author validation errors
  if (message.includes('Author validation failed')) {
    if (message.includes('`name` to be unique')) {
      return ERROR_MESSAGES.AUTHOR.DUPLICATE
    }
    if (message.includes('shorter than the minimum allowed')) {
      return ERROR_MESSAGES.AUTHOR.MIN_LENGTH
    }
  }
  
  // Book validation errors
  if (message.includes('Book validation failed')) {
    if (message.includes('`title` to be unique')) {
      return ERROR_MESSAGES.BOOK.DUPLICATE
    }
    if (message.includes('shorter than the minimum allowed')) {
      return ERROR_MESSAGES.BOOK.MIN_LENGTH
    }
  }
  
  return message
}

module.exports = {
  handleValidationError,
  ERROR_MESSAGES
} 