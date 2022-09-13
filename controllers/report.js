const Transaction = require("../models/transaction");

exports.getMonthlyBalance = (req, res, next) => {
  Transaction.getTotalIncomeByMonth(req.user._id)
  .then((incomes) => {
    Transaction.getTotalExpenseByMonth(req.user._id)
    .then((expenses) => {
      Transaction.getTotalExpenseByCategory(req.user._id)
      .then(categories => {
        res.render("monthlyBalance", {
          pageTitle: "Monthly Balance",
          path: "/monthlyBalance",
          user: req.user,
          income: incomes,
          expense: expenses,
          category: categories,
        })
      })
    });
  })
};
