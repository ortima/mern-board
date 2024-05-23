const { Router } = require('express')
const router = Router()
const transactionController = require('../controllers/transactionController')

router.post('/transactions', transactionController.createTransaction)
router.get('/transactions', transactionController.getAllTransactions)
router.get('/transactions/:id', transactionController.getTransactionById)
router.put('/transactions/:id', transactionController.updateTransaction)
router.delete('/transactions/:id', transactionController.deleteTransaction)

module.exports = router
