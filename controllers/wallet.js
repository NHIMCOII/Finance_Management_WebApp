const User = require("../models/user");
const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");

exports.myWallet = async (req, res, next) => {
  try {
    const wallets = await User.findById(req.userId).populate("myWallets.list");
    res
      .status(200)
      .json({ message: "Wallets fetched", wallets: wallets.myWallets.list });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addWallet = async (req, res, next) => {
  try {
    const type = req.body.type;
    let acc_balance = Number(req.body.acc_balance);
    if (type == "Debts") {
      acc_balance = -acc_balance;
    }
    const name = req.body.name;
    const percentage = req.body.percentage;
    const period = req.body.period;
    const note = req.body.note;
    const wallet = new Wallet({
      user_id: req.userId,
      name: name,
      type: type,
      acc_balance: acc_balance,
      percentage: percentage,
      period: period,
      note: note,
      transactions: { list: [] },
    });
    wallet.save();
    const user = await User.findById(req.userId);
    user.myWallets.list.push(wallet);
    user.save();
    res.status(201).json({ message: "Added new wallet", wallet: wallet });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editWallet = async (req, res, next) => {
  try {
    const wallet_id = req.params.wallet_id;
    const type = req.body.type;
    const name = req.body.name;
    const acc_balance = Number(req.body.acc_balance);
    const percentage = req.body.percentage;
    const period = req.body.period;
    const note = req.body.note;

    const thisWallet = await Wallet.findById(wallet_id);
    thisWallet.type = type;
    thisWallet.name = name;
    thisWallet.acc_balance = acc_balance;
    thisWallet.percentage = percentage;
    thisWallet.period = period;
    thisWallet.note = note;
    thisWallet
      .save()
      .then((result) => {
        res.status(201).json({ message: "Wallet Updated", wallet: result });
      })
      .catch((err) => {
        err.statusCode = 409;
        throw err;
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteWallet = async (req, res, next) => {
  try {
    const wallet_id = req.params.wallet_id;
    Wallet.findByIdAndRemove(wallet_id).catch((err) => {
      err.statusCode = 409;
      throw err;
    });
    // delete all transactions from this wallet
    const transactions = await Transaction.find({ wallet_id: wallet_id });
    transactions.map(async (item) => {
      await Transaction.findByIdAndRemove(item._id);
    });
    // delete wallet in users
    const user = await User.findById(req.userId);
    user.myWallets.list.pull(wallet_id);
    user.save();
    res.status(200).json({ message: "Wallet Deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTransfers = async (req, res, next) => {
  try {
    // const wallets = await Wallet.find({ user_id: req.userId });
    const transfers = await Transaction.find({
      user_id: req.userId,
      category: "Money Transfer",
      amount: { $gte: 0 },
    });
    res.status(200).json({
      message: "Fetched Transfers",
      // wallets: wallets,
      transfers: transfers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTransfers = async (req, res, next) => {
  try {
    const wallet_id_A = req.body.wallet_id_A;
    const wallet_id_B = req.body.wallet_id_B;
    const amount = new Number(req.body.amount);
    const date = new Date(req.body.date);
    const note = req.body.note;
    if (wallet_id_A == wallet_id_B) {
      const error = new Error(
        "You cant transfer money in 1 wallet, needed 2 different one!"
      );
      error.statusCode = 400;
      throw error;
    }

    const walletA = await Wallet.findById(wallet_id_A);
    const walletB = await Wallet.findById(wallet_id_B);

    const transferWallet = { A: walletA.name, B: walletB.name };
    const transferB = new Transaction({
      user_id: req.userId,
      wallet_id: wallet_id_B,
      category: "Money Transfer",
      amount: amount,
      date: date,
      note: note,
      parent: 0,
      transferWallet: transferWallet,
    });
    await transferB.save();

    const transferA = new Transaction({
      user_id: req.userId,
      wallet_id: wallet_id_A,
      category: "Money Transfer",
      amount: -amount,
      date: date,
      note: note,
      parent: 0,
      transferWallet: transferWallet,
    });
    await transferA.save();

    walletB.acc_balance += amount;
    walletB.transactions.list.push(transferB);
    walletB.save();

    walletA.acc_balance -= amount;
    walletA.transactions.list.push(transferA);
    walletA.save();

    res.status(200).json({message:'Transfer succeeded'})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.detailsTransfer = async (req, res, next) => {
  try {
    const transfer_id = req.params.transfer_id;
    const transfer = await Transaction.findById(transfer_id)
    res.status(200).json({ message: "Fetched Transfer", transfer: transfer });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
