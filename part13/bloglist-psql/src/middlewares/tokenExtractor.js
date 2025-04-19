// Import JWT:
const jwt = require('jsonwebtoken')

// Import Config:
const { SERVER_SECRET } = require('../config/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SERVER_SECRET)
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

// Export Token Extractor:
module.exports = tokenExtractor