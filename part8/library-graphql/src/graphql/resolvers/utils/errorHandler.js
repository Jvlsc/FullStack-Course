// Validation Error Messages
const ERROR_MESSAGES = {
  AUTHOR: {
    DUPLICATE: 'Author already exists in Library',
    MIN_LENGTH: 'Author name must be at least 4 characters long',
    NAME_REQUIRED: 'Author name is required'
  },
  BOOK: {
    DUPLICATE: 'Book already exists in Library',
    MIN_LENGTH: 'Book title must be at least 5 characters long',
    TITLE_REQUIRED: 'Book title is required'
  },
  USER: {
    DUPLICATE: 'Username already exists in Library',
    MIN_LENGTH: 'Username must be at least 3 characters long',
    NAME_REQUIRED: 'Username is required'
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
    if (message.includes('"name" of type "String!" is required')) {
      return ERROR_MESSAGES.AUTHOR.NAME_REQUIRED
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
    if (message.includes('"title" of type "String!" is required')) {
      return ERROR_MESSAGES.BOOK.TITLE_REQUIRED
    }
    if (message.includes('shorter than the minimum allowed')) {
      return ERROR_MESSAGES.BOOK.MIN_LENGTH
    }
  }

  // User validation errors
  if (message.includes('User validation failed')) {
    if (message.includes('`username` to be unique')) {
      return ERROR_MESSAGES.USER.DUPLICATE
    }
    if (message.includes('shorter than the minimum allowed')) {
      return ERROR_MESSAGES.USER.MIN_LENGTH
    }
  }
  
  return message
}

module.exports = {
  handleValidationError,
  ERROR_MESSAGES
} 