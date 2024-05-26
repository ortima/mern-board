const { Router } = require('express')
const router = Router()
const transactionController = require('../controllers/transactionController')
const authMiddleware = require('./middleware')

router.post(
  '/transactions',
  authMiddleware,
  transactionController.createTransaction
)
router.get(
  '/transactions',
  authMiddleware,
  transactionController.getAllTransactions
)
router.get(
  '/transactions/:id',
  authMiddleware,
  transactionController.getTransactionById
)
router.put(
  '/transactions/:id',
  authMiddleware,
  transactionController.updateTransaction
)
// router.delete(
//   '/transactions/:id',
//   authMiddleware,
//   transactionController.deleteTransaction
// )
router.delete(
  '/transactions',
  authMiddleware,
  transactionController.deleteTransactions
)

module.exports = router
