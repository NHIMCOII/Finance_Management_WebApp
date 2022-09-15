const mongoose = require('mongoose')

const Schema = mongoose.Schema


// const transaction = require('./transaction')
const transactionSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wallet_id:{
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    category:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    note:{
        type: String,
        required: false
    },
    parent:{
        type: Number,
        ref: 'Category',
        required: true
    },
    transferWallet:{
        A: {type: String ,required: false},
        B: {type: String ,required: false}
    }
})


transactionSchema.statics.getRecentTransactions = function (user_id) {
    return (
      this.aggregate([
        // Stage 1: Filter transactions by user_id
        {
          $match: { user_id: user_id },
        },
        // Stage 2: Sort by date
        {
          $sort: { date: -1 },
        },
      ])
        //  .toArray()
        .then((transactions) => {
          return transactions;
        })
        .catch((err) => console.log(err))
    );
  };
  
  transactionSchema.statics.getTotalIncomeByMonth = function (user_id) {
    return (
      this.aggregate([
        {
          $match: {
            user_id: user_id,
            transferWallet: { $eq: null },
          },
        },
        {
          $project: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            amount: "$amount",
            x: { $cmp: ["$amount", 0] },
          },
        },
        {
          $match: { x: 1, "_id.year": new Date().getFullYear() },
        },
        {
          $group: {
            _id: "$_id",
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
        // .toArray()
        .then((arr) => {
          const expenses = [];
          for (let item of arr) {
            expenses[item._id.month - 1] = item.totalAmount;
          }
          for (let i = 0; i < 12; i++) {
            if (!expenses[i]) {
              expenses[i] = 0;
            }
          }
          return expenses;
        })
        .catch((err) => console.log(err))
    );
  };
  
  transactionSchema.statics.getTotalExpenseByMonth = function (user_id) {
    return (
      this.aggregate([
        {
          $match: {
            user_id: user_id,
            transferWallet: { $eq: null },
          },
        },
        {
          $project: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            amount: "$amount",
            x: { $cmp: ["$amount", 0] },
          },
        },
        {
          $match: { x: -1, "_id.year": new Date().getFullYear() },
        },
        {
          $group: {
            _id: "$_id",
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
        // .toArray()
        .then((arr) => {
          const expenses = [];
          for (let item of arr) {
            expenses[item._id.month - 1] = -item.totalAmount;
          }
          for (let i = 0; i < 12; i++) {
            if (!expenses[i]) {
              expenses[i] = 0;
            }
          }
          return expenses;
        })
        .catch((err) => console.log(err))
    );
  };
  
  transactionSchema.statics.getTotalExpenseByCategory = function (user_id) {
    return this
      .aggregate([
        {
          $match: {
            user_id: user_id,
            transferWallet: { $eq: null },
          },
        },
        {
          $project: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            parent: "$parent",
            amount: "$amount",
            x: { $cmp: ["$amount", 0] },
          },
        },
        {
          $match: { x: -1, "_id.year": new Date().getFullYear() },
        },
        {
          $group: {
            _id: "$parent",
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
      // .toArray()
      .then((arr) => {
        const category = [];
        for (let item of arr) {
          category[item._id - 1] = -item.totalAmount;
        }
        for (let i = 0; i < 9; i++) {
          if (!category[i]) {
            category[i] = 0;
          }
        }
        return category;
      })
      .catch((err) => console.log(err));
  };

module.exports = mongoose.model('Transaction',transactionSchema);