const { Schema, model, Types } = require('mongoose')

const transactionShema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

transactionShema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = model('Transaction', transactionShema)
