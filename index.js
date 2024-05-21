const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

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
