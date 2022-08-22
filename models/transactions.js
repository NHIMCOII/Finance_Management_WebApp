const getDb = require('../utils/database').getDb;
const { ObjectId } = require('mongodb');


module.exports = class Transaction {
    constructor(user_id,wallet_id,category,amount,date,note){
        this.user_id = user_id,
        this.wallet_id = new ObjectId(wallet_id),
        this.category = category,
        this.amount = Number(amount),
        this.date = date,
        this.note = note 
    }

    save() {
        const db = getDb();
        return db.collection('transactions').insertOne(this)
        .then(result => {
            return result;
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
// ======================= Expenses Method ===========================
    static fetchAllExpenses(user_id){
        const db = getDb();
        return db.collection('transactions').find({user_id: user_id, amount:{$lt: 0}}).toArray()
        .then(transactions => {
            return transactions;
        })
        .catch(err => console.log(err));
    }
}