// Import the JSON Web Token:
const jwt = require('jsonwebtoken')

// Import the Config Module:
const config = require('../utils/config')

// User Extractor Middleware:
const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SERVER_SECRET)
  request.user = decodedToken.id
  next()
}

module.exports = userExtractor