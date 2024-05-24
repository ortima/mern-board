const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(401).json({ error: 'Access denied' })
    }

    const tokenParts = token.split(' ')
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res
        .status(401)
        .json({ error: 'Invalid authorization header format' })
    }

    const decoded = jwt.verify(tokenParts[1], 'ortima')
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: 'Access denied' })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' })
  }
}

module.exports = authMiddleware
