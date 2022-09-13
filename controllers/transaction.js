const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const Category = require("../models/category");

// ================== INCOMES ================

exports.getIncome = (req, res, next) => {
  req.user
    .populate("myWallets.list.wallet_id")
    .then((wallets) => {
      Transaction.find({ user_id: req.user._id, amount: { $gte: 0 } }).then(
        (incomes) => {
          res.render("income", {
            user: req.user,
            wallets: wallets.myWallets.list,
            incomes: incomes ? incomes : [],
            pageTitle: "Income",
            path: "/income",
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postIncome = (req, res, next) => {
  const category = req.body.category_id;
  const amount = Number(req.body.amount);
  const note = req.body.note;
  const date = req.body.date;
  const wallet_id = req.body.wallet_id;

  Category.findOne({ category: category }).then((result) => {
    const income = new Transaction({
      user_id: req.user._id,
      wallet_id: wallet_id,
      category: category,
      amount: amount,
      date: date,
      note: note,
      parent: result.parent,
    });
    income.save().then((income) => {
      Wallet.findById(wallet_id)
        .then((thisWallet) => {
          thisWallet.acc_balance += amount;
          return thisWallet.save();
        })
        .then((wallet) => {
          wallet.addToTransactions(income);
          res.redirect("/income");
        })
        .catch((err) => console.log(err));
    });
  });
};

exports.getDetailsIncome = (req, res, next) => {
  const income_id = req.params.income_id;
  Transaction.findById(income_id).then((income) => {
    Wallet.findById(income.wallet_id)
      .then((wallet) => {
        res.render("income_details", {
          pageTitle: "Income Details",
          user: req.user,
          wallet: wallet,
          income: income,
          path: "/incomeDetails",
        });
      })
      .catch((err) => console.log(err));
  });
};

exports.deleteIncome = (req, res, next) => {
  const income_id = req.params.income_id;
  const wallet_id = req.body.wallet_id;
  const amount = Number(req.body.amount);
  Transaction.findByIdAndRemove(income_id).then(() => {
    Wallet.findById(wallet_id)
      .then((thisWallet) => {
        thisWallet.acc_balance -= amount;
        return thisWallet;
      })
      .then((wallet) => {
        wallet.deleteFromTransactions(income_id);
      })
      .then(() => {
        // res.status(200).json({ message: "Success" });
        return res.redirect('/income')
      })
      .catch((err) => {
        // res.status(500).json({ message: "Failed" });
      });
  });
};

// ================== EXPENSES ================

exports.getExpense = (req, res, next) => {
  req.user
    .populate("myWallets.list.wallet_id")
    .then((wallets) => {
      Transaction.find({ user_id: req.user._id, amount: { $lt: 0 } }).then(
        (expenses) => {
          res.render("expense", {
            user: req.user,
            wallets: wallets.myWallets.list,
            expenses: expenses ? expenses : [],
            pageTitle: "Expense",
            path: "/expense",
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postExpense = (req, res, next) => {
  const category = req.body.category_id;
  const amount = -Number(req.body.amount);
  const note = req.body.note;
  const date = req.body.date;
  const wallet_id = req.body.wallet_id;

  Category.findOne({ category: category }).then((result) => {
    const expense = new Transaction({
      user_id: req.user._id,
      wallet_id: wallet_id,
      category: category,
      amount: amount,
      date: date,
      note: note,
      parent: result.parent,
    });
    expense.save().then((expense) => {
      Wallet.findById(wallet_id)
        .then((thisWallet) => {
          thisWallet.acc_balance += amount;
          return thisWallet.save();
        })
        .then((wallet) => {
          wallet.addToTransactions(expense);
          res.redirect("/expense");
        })
        .catch((err) => console.log(err));
    });
  });
};

exports.getDetailsExpense = (req, res, next) => {
  const expense_id = req.params.expense_id;
  Transaction.findById(expense_id).then((expense) => {
    Wallet.findById(expense.wallet_id)
      .then((wallet) => {
        res.render("expense_details", {
          pageTitle: "Expense Details",
          user: req.user,
          wallet: wallet,
          expense: expense,
          path: "/expenseDetails",
        });
      })
      .catch((err) => console.log(err));
  });
};

exports.deleteExpense = (req, res, next) => {
  const expense_id = req.params.expense_id;
  const wallet_id = req.body.wallet_id;
  const amount = Number(req.body.amount);
  Transaction.findByIdAndRemove(expense_id).then(() => {
    Wallet.findById(wallet_id)
      .then((thisWallet) => {
        thisWallet.acc_balance -= amount;
        return thisWallet;
      })
      .then((wallet) => {
        wallet.deleteFromTransactions(expense_id);
      })
      .then(() => {
        // res.status(200).json({ message: "Success" });
        return res.redirect('/expense')
      })
      .catch((err) => {
        // res.status(500).json({ message: "Failed" });
      });
  });
};
