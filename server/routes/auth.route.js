const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')

// registration
router.post(
  '/registration',
  authController.validateRegistrationData,
  authController.createUser
)

// login
router.post(
  '/login',
  authController.validateLoginData,
  authController.loginUser
)

module.exports = router
