const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.validateRegistrationData = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Incorrect password').isLength({ min: 6 }),
]

exports.validateLoginData = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Incorrect password').exists(),
]

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: 'Incorrect data' })
    }
    const { email, password } = req.body

    const isUsed = await User.findOne({ email })

    const hashedPassword = await bcrypt.hash(password, 12)

    if (isUsed) {
      return res.status(400).json({ message: 'Email is not available!' })
    }
    const user = new User({
      email,
      password: hashedPassword,
    })

    await user.save()
    res.status(201).json({ message: 'User added', user })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: 'Incorrect data' })
    }
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email is not registred in database' })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(400).json({ message: 'Password incorrect' })
    }

    const SECRET_KEY_JWT = 'ortima'

    const token = jwt.sign({ userId: user.id }, SECRET_KEY_JWT, {
      expiresIn: '12h',
    })
    res.json({ token, userId: user.id, email: user.email })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}
