import { Router } from "express"
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransactions,
} from "../controllers/transactionController.js"
import authMiddleware from "./middleware.js"

const router = Router()

// Create Transaction
router.post("/transactions", authMiddleware, createTransaction)

// Get All Transactions
router.get("/transactions", authMiddleware, getAllTransactions)

// Get Transaction by ID
router.get("/transactions/:id", authMiddleware, getTransactionById)

// Update Transaction
router.put("/transactions/:id", authMiddleware, updateTransaction)

// Delete Transactions
router.delete("/transactions", authMiddleware, deleteTransactions)

export default router
