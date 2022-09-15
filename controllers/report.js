const Transaction = require("../models/transaction");
const User = require("../models/user");

exports.dashboard = async (req, res, next) => {
  try {
    const wallets = await User.findById(req.userId).populate("myWallets.list");
    const recents = await Transaction.getRecentTransactions(req.userId)
    .catch(err => {
      throw err
    })
    const incomes = await Transaction.getTotalIncomeByMonth(req.userId)
    .catch(err => {
      throw err
    })
    const expenses = await Transaction.getTotalExpenseByMonth(req.userId)
    .catch(err => {
      throw err
    })
    res
      .status(200)
      .json({
        message: "Fetched Dashboard",
        wallets: wallets.myWallets.list,
        recents: recents,
        incomes: incomes,
        expenses: expenses,
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.monthlyBalance = async (req, res, next) => {
  try {
    const categories = await Transaction.getTotalExpenseByCategory(req.userId).catch(
      (err) => {
        throw err;
      }
    );
    const incomes = await Transaction.getTotalIncomeByMonth(req.userId).catch(
      (err) => {
        throw err;
      }
    );
    const expenses = await Transaction.getTotalExpenseByMonth(req.userId).catch(
      (err) => {
        throw err;
      }
    );
    res.status(200).json({
      message: "Fetched Monthly Balance",
      categories: categories,
      incomes: incomes,
      expenses: expenses,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
