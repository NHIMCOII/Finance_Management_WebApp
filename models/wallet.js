const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  acc_balance: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: false,
  },
  period: {
    type: Number,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  transactions: {
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        required: false,
      },
    ],
  },
});

walletSchema.methods.addToTransactions = function (transaction) {
  let result = null;
  if (!this.transactions.list.length) {
    const myTransactions = [];
    myTransactions.push({ transaction_id: transaction._id });
    result = myTransactions;
  } else {
    const myTransactions = [...this.transactions.list];
    myTransactions.push({ transaction_id: transaction._id });
    result = myTransactions;
  }

  this.transactions.list = result;
  return this.save();
};

walletSchema.methods.deleteFromTransactions = function (transaction_id) {
  const updatedTransactions = this.transactions.list.filter((transaction) => {
    return transaction_id.toString() !== transaction.transaction_id.toString();
  });

  this.transactions.list = updatedTransactions;
  this.save();
};

module.exports = mongoose.model("Wallet", walletSchema);