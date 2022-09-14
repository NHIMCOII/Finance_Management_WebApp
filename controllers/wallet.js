const User = require("../models/user");
const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");

exports.myWallet = async (req, res, next) => {
  try {
    const wallets = await User.findById(req.userId).populate(
      "myWallets.list.wallet_id"
    );
    res.status(200).json({ message: "Wallets fetched", wallets: wallets });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addWallet = (req, res, next) => {
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
    wallet
      .save()
      .then(async (result) => {
        const user = await User.findById(req.userId);
        user.addToMyWallets(result);
        res.status(201).json({ message: "Added new wallet", wallet: result });
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
    // Transaction.find({wallet_id: wallet_id})
    // .then(transactions => {
    //     transactions.map(item => {
    //         Transaction.findByIdAndRemove(item._id)
    //         .then(() => {
    // delete wallet in users
    const user = await User.findById(req.userId);
    user.deleteFromMyWallets(wallet_id).catch((err) => {
      err.statusCode = 409;
      throw err;
    });
    res.status(200).json({message: "Wallet Deleted"})
    // })
    //     })
    // })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// exports.getMoneyTransfer = (req,res,next) => {
//     Wallet.find({user_id: req.user._id})
//     .then((wallets) => {
//         Transaction.find({user_id: req.user._id,category: 'Money Transfer',amount: {$gte: 0}})
//         .then(transfers => {
//             res.render('moneyTransfer',{
//                 user: req.user,
//                 wallets: wallets,
//                 transfers: transfers,
//                 pageTitle: 'Money Transfer',
//                 path: '/moneyTransfer'
//             })
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     });

// }

// exports.postMoneyTransfer = (req,res,next) => {
//     const wallet_id_A = req.body.wallet_id_A
//     const wallet_id_B = req.body.wallet_id_B
//     const amount = Number(req.body.amount)
//     const date = Date(req.body.date)
//     const note = req.body.note
//     if(wallet_id_A == wallet_id_B){
//         return res.redirect('/moneyTransfer')
//     }
//     Wallet.findById(wallet_id_A)
//     .then( walletA => {
//         Wallet.findById(wallet_id_B)
//         .then(walletB => {
//             const transferWallet = {A: walletA.name, B: walletB.name}
//             const transferB = new Transaction({user_id: req.user._id,wallet_id: wallet_id_B,category: 'Money Transfer',amount: amount,date: date,note: note,parent: 0, transferWallet: transferWallet})
//             transferB.save()
//             const transferA = new Transaction({user_id: req.user._id,wallet_id: wallet_id_A,category: 'Money Transfer',amount: -amount,date: date,note: note,parent: 0, transferWallet: transferWallet})
//             transferA.save()
//             const result = {
//                 wallets:{A: walletA,B: walletB},
//                 transfers: {A: transferA, B:transferB}
//             }
//             return result
//         })
//         .then(result => {
//             result.wallets.B.acc_balance += amount
//             // result.wallets.B.save()
//             result.wallets.B.addToTransactions(result.transfers.B)

//             result.wallets.A.acc_balance -= amount
//             // result.wallets.A.save()
//             result.wallets.A.addToTransactions(result.transfers.A)
//         })
//     })
//     .then(() => {
//         res.redirect('/moneyTransfer')
//     })
//     .catch(err => console.log(err))
// }
