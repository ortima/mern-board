const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const transactionRoutes = require('./routes/transaction.route')
const authRoutes = require('./routes/auth.route')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: true }))
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use('/api', authRoutes)
app.use('/api', transactionRoutes)

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster.lop7faj.mongodb.net/?retryWrites=true&w=majority'
    )
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    )
    console.log('MongoDB Connected')
  } catch (e) {
    console.log(e)
  }
}

start()
