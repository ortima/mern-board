import Transaction from "../models/Transaction.js";
import { v4 as uuidv4 } from "uuid";

export const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user._id,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const bulkCreateTransactions = async (req, res) => {
  try {
    const bulkOps = req.body.map((transaction) => ({
      insertOne: {
        document: {
          ...transaction,
          transactionId: uuidv4(),
          userId: req.user._id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }));

    await Transaction.bulkWrite(bulkOps);
    const status = bulkOps.map(() => "Success");

    res.status(201).json({ status });
  } catch (error) {
    console.error("Error performing bulk operations", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $match: { userId: req.user._id },
      },
    ]);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { transactionId: req.params.id, userId: req.user._id },
      req.body,
      { new: true },
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    const { transactionIds } = req.body;
    if (!Array.isArray(transactionIds)) {
      return res.status(400).json({ error: "transactionIds must be an array" });
    }

    const result = await Transaction.deleteMany({
      transactionId: { $in: transactionIds },
      userId: req.user._id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Transactions not found" });
    }

    res.status(200).json({ message: "Transactions deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
