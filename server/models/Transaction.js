import { Schema, model, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const transactionSchema = new Schema({
  transactionId: { type: String, default: uuidv4, unique: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

transactionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
