import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateRegistrationData = [
  check("name", "Incorrect name").isString(),
  check("email", "Incorrect email").isEmail(),
  check("password", "Incorrect password").isLength({ min: 6 }),
];

export const validateLoginData = [
  check("email", "Incorrect email").isEmail(),
  check("password", "Incorrect password").exists(),
];

export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Incorrect data" });
    }
    const { name, email, password } = req.body;

    const isUsed = await User.findOne({ email });

    if (isUsed) {
      return res.status(400).json({ message: "Email is not available!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User added", user });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Incorrect data" });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email is not registered in database" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.json({ token, userId: user.id, email: user.email, name: user.name });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
};
