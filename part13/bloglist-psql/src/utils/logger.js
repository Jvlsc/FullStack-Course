// Info Logger:
const info = (...params) => {
  console.log(...params)
}

// Error Logger:
const error = (...params) => {
  console.error(...params)
}

// Export the Logger Module:
module.exports = { info, error }