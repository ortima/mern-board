import { Router } from "express"
import {
  validateRegistrationData,
  createUser,
  validateLoginData,
  loginUser,
} from "../controllers/authController.js"

const router = Router()

// Registration
router.post("/registration", validateRegistrationData, createUser)

// Login
router.post("/login", validateLoginData, loginUser)

export default router
