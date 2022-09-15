const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const Category = require("../models/category");
const User = require("../models/user");

// ================== INCOMES ================

exports.getIncomes = async (req, res, next) => {
  try {
    const wallets = await User.findById(req.userId).populate("myWallets.list");
    const incomes = await Transaction.find({
      user_id: req.userId,
      amount: { $gte: 0 },
    });
    res.status(200).json({
      message: "Incomes Fetched",
      wallets: wallets.myWallets.list,
      incomes: incomes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postIncome = async (req, res, next) => {
  try {
    const category = req.body.category;
    const amount = new Number(req.body.amount);
    const note = req.body.note;
    const date = new Date(req.body.date);
    const wallet_id = req.body.wallet_id;

    const parent = await Category.findOne({ category: category });
    const income = new Transaction({
      user_id: req.userId,
      wallet_id: wallet_id,
      category: category,
      amount: amount,
      date: date,
      note: note,
      parent: parent.parent,
    });
    income.save();

    const wallet = await Wallet.findById(wallet_id);
    wallet.acc_balance += amount;
    wallet.transactions.list.push(income);
    wallet.save();

    res.status(200).json({ message: "Added new income", income: income });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.detailsIncome = async (req, res, next) => {
  try {
    const income_id = req.params.income_id;
    const income = await Transaction.findById(income_id).populate("wallet_id");
    res.status(200).json({ message: "Fetched Income", income: income });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteIncome = async (req, res, next) => {
  try {
    const income_id = req.params.income_id;
    const income = await Transaction.findById(income_id)
    const wallet_id = income.wallet_id;
    const amount = income.amount;
    await Transaction.findByIdAndRemove(income_id);

    const wallet = await Wallet.findById(wallet_id);
    wallet.acc_balance -= amount;
    wallet.transactions.list.pull(income_id);
    await wallet.save()

    res.status(200).json({ message: "Income Deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ================== EXPENSES ================

exports.getExpenses = async (req, res, next) => {
    try {
      const wallets = await User.findById(req.userId).populate("myWallets.list");
      const expenses = await Transaction.find({
        user_id: req.userId,
        amount: { $lt: 0 },
      });
      res.status(200).json({
        message: "Expenses Fetched",
        wallets: wallets.myWallets.list,
        expenses: expenses,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.postExpense = async (req, res, next) => {
    try {
      const category = req.body.category;
      const amount = new Number(req.body.amount);
      const note = req.body.note;
      const date = new Date(req.body.date);
      const wallet_id = req.body.wallet_id;
  
      const parent = await Category.findOne({ category: category });
      const expense = new Transaction({
        user_id: req.userId,
        wallet_id: wallet_id,
        category: category,
        amount: -amount,
        date: date,
        note: note,
        parent: parent.parent,
      });
      expense.save();
  
      const wallet = await Wallet.findById(wallet_id);
      wallet.acc_balance -= amount;
      wallet.transactions.list.push(expense);
      wallet.save();
  
      res.status(200).json({ message: "Added new expense", expense: expense });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.detailsExpense = async (req, res, next) => {
    try {
      const expense_id = req.params.expense_id;
      const expense = await Transaction.findById(expense_id).populate("wallet_id");
      res.status(200).json({ message: "Fetched Expense", expense: expense });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.deleteExpense = async (req, res, next) => {
    try {
      const expense_id = req.params.expense_id;
      const expense = await Transaction.findById(expense_id)
      const wallet_id = expense.wallet_id;
      const amount = expense.amount;
      await Transaction.findByIdAndRemove(expense_id);
  
      const wallet = await Wallet.findById(wallet_id);
      wallet.acc_balance -= amount;
      wallet.transactions.list.pull(expense_id);
      await wallet.save()
  
      res.status(200).json({ message: "Expense Deleted" });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };