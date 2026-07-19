const Transaction = require("../models/Transaction");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedTransaction);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.json({
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get summary
const getSummary = async (req, res) => {
  try {

    const transactions =
      await Transaction.find({
        user: req.user.id,
      });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expense;

    res.json({
      income,
      expense,
      balance,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
};