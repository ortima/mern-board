const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()

//registration
router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({ min: 6 }),
  ],
  async (req, res) => {
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
)

//login
router.post(
  '/login',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').exists(),
  ],
  async (req, res) => {
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

      const SECRET_KEY_JWT = 'ortima' //TODO: поменять токен и вынести в env

      const token = jwt.sign({ userId: user.id }, SECRET_KEY_JWT, {
        expiresIn: '1h',
      })
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
)
module.exports = router
