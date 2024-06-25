import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransactions,
  bulkCreateTransactions,
} from "../controllers/transactionController.js";
import authMiddleware from "./middleware.js";

const router = Router();

const transactionRoute = "/transactions";

// Create Transaction
router.post(transactionRoute, authMiddleware, createTransaction);

// Bulk operations
router.post(
  `${transactionRoute}/upload-data`,
  authMiddleware,
  bulkCreateTransactions,
);

// Get All Transactions
router.get(transactionRoute, authMiddleware, getAllTransactions);

// Get Transaction by ID
router.get(`${transactionRoute}/:id`, authMiddleware, getTransactionById);

// Update Transaction
router.put(`${transactionRoute}/:id`, authMiddleware, updateTransaction);

// Delete Transactions
router.delete(transactionRoute, authMiddleware, deleteTransactions);

export default router;
