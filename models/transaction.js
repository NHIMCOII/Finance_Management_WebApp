const getDb = require('../utils/database').getDb;
const { ObjectId } = require('mongodb');

module.exports = class Transaction {
    constructor(user_id,wallet_id,category,amount,date,note,parent,transferWallet){
        this.user_id = user_id,
        this.wallet_id = new ObjectId(wallet_id),
        this.category = category,
        this.amount = Number(amount),
        this.date = new Date(date),
        this.note = note,
        this.parent = parent,
        this.transferWallet = transferWallet  
    }

    save() {
        const db = getDb();
        return db.collection('transactions').insertOne(this)
        .then(result => {
            return this;
        })
        .catch(err => console.log(err));
    }

    static deleteTransaction(id) {
        const db = getDb();
        return db.collection('transactions').deleteOne({_id: new ObjectId(id)})
        .then(() => {
            console.log('Transaction Deleted')
        })
        .catch(err => console.log(err))
    }

    static findByPk(id) {
        const db = getDb();
        return db.collection('transactions')
        .findOne({_id: new ObjectId(id)})
        .then(transaction => {
            return transaction;
        })
        .catch(err => console.log(err));
    }
    static fetchAllTransactionsFromWallet(wallet_id) {
        const db = getDb();
        return db.collection('transactions').find({wallet_id: new ObjectId(wallet_id)}).toArray()
        .then(transactions => {
            return transactions;
        })
        .catch(err => console.log(err));
    }

    static getRecentTransactions(user_id){
        const db = getDb();
        return db.collection('transactions').aggregate([
            // Stage 1: Filter transactions by user_id
            {
               $match: { user_id: user_id }
            },
            // Stage 2: Sort by date
            {
               $sort: {date: -1}
            }
         ]).toArray()
        .then(transactions => {
            return transactions;
        })
        .catch(err => console.log(err));
    }

    static getMoneyTransfer(user_id) {
        const db = getDb();
        return db.collection('transactions').find({user_id: user_id, transferWallet:{$ne: null},amount:{$gte: 0}}).toArray()
        .then(transfers => {
            return transfers
        })
    }


// ======================= Incomes Method ===========================
    static fetchAllIncomes(user_id){
        const db = getDb();
        return db.collection('transactions').find({user_id: user_id, amount:{$gte: 0}}).toArray()
        .then(transactions => {
            return transactions;
        })
        .catch(err => console.log(err));
    }

    static getTotalIncomeByMonth(user_id) {
        const db = getDb();
        return db.collection('transactions').aggregate( [
            {
                $match: { 
                    user_id: user_id ,
                    transferWallet: {$eq: null}
                },
            },
            {
                $project: {
                    _id: {
                        month: {$month: "$date"},
                        year: {$year: "$date"},
                    },
                    amount: "$amount",
                    x: {$cmp: ["$amount",0]},
                }
            },
            {
                $match: {x: 1, "_id.year": new Date().getFullYear()}
            },
            {
                $group: {
                    _id: "$_id",
                    totalAmount: {$sum: "$amount"},
                }
            },
            {
                $sort: {_id: 1}
            }
         ]).toArray()
         .then(arr => {
            const incomes = [];
            for ( let item of arr){
                incomes[item._id.month-1] = item.totalAmount
            }
            for (let i=0; i < 12; i++){
                if(!incomes[i]){
                    incomes[i] = 0
                }
            }
            return incomes
         })
        .catch(err => console.log(err));
    }
// ======================= Expenses Method ===========================
    static fetchAllExpenses(user_id){
        const db = getDb();
        return db.collection('transactions').find({user_id: user_id, amount:{$lt: 0}}).toArray()
        .then(transactions => {
            return transactions;
        })
        .catch(err => console.log(err));
    }

    static getTotalExpenseByMonth(user_id) {
        const db = getDb();
        return db.collection('transactions').aggregate( [
            {
                $match: { 
                    user_id: user_id ,
                    transferWallet: {$eq: null}
                },
            },
            {
                $project: {
                    _id: {
                        month: {$month: "$date"},
                        year: {$year: "$date"},
                    },
                    amount: "$amount",
                    x: {$cmp: ["$amount",0]},
                }
            },
            {
                $match: {x: -1, "_id.year": new Date().getFullYear()}
            },
            {
                $group: {
                    _id: "$_id",
                    totalAmount: {$sum: "$amount"},
                }
            },
            {
                $sort: {_id: 1}
            }
         ]).toArray()
         .then(arr => {
            const expenses = [];
            for ( let item of arr){
                expenses[item._id.month-1] = -item.totalAmount
            }
            for (let i=0; i < 12; i++){
                if(!expenses[i]){
                    expenses[i] = 0
                }
            }
            return expenses
         })
        .catch(err => console.log(err));
    }

    static getTotalExpenseByCategory(user_id) {
        const db = getDb();
        return db.collection('transactions').aggregate( [
            {
                $match: { 
                    user_id: user_id ,
                    transferWallet: {$eq: null}
                },
            },
            {
                $project: {
                    _id: {
                        month: {$month: "$date"},
                        year: {$year: "$date"},
                    },
                    parent: "$parent",
                    amount: "$amount",
                    x: {$cmp: ["$amount",0]},
                }
            },
            {
                $match: {x: -1, "_id.year": new Date().getFullYear()}
            },
            {
                $group: {
                    _id: "$parent",
                    totalAmount: {$sum: "$amount"},
                }
            },
            {
                $sort: {_id: 1}
            }
         ]).toArray()
         .then(arr => {
            const category = []
            for (let item of arr){
                category[item._id-1] = -item.totalAmount
            }
            for (let i=0; i < 9; i++){
                if(!category[i]){
                    category[i] = 0
                }
            }
            return category
         })
        .catch(err => console.log(err));
    }
}