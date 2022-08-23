    const getDb = require('../utils/database').getDb;
    const { ObjectId } = require('mongodb');


    module.exports = class Wallet {
    constructor(user_id,name,type,acc_balance,percentage,period,note,transactions,id) {
        this.user_id = user_id;
        this.name = name;
        this.type = type;
        this.acc_balance = Number(acc_balance);
        this.percentage = percentage;
        this.period = period;
        this.transactions = transactions;
        this.note = note;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('wallets').insertOne(this)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
    }

    update() {
        const db = getDb();
        return db.collection('wallets')
        .updateOne({_id: new ObjectId(this._id)}, {$set: {name: this.name,type: this.type,acc_balance: this.acc_balance, percentage: this.percentage, period: this.period, transactions: this.transactions, note: this.note} })
    }

    static deleteWallet(id) {
        const db = getDb();
        return db.collection('wallets').deleteOne({_id: new ObjectId(id)})
        .then(() => {
            console.log('Wallet Deleted')
        })
        .catch(err => console.log(err))
    }

    static findByPk(id) {
        const db = getDb();
        return db.collection('wallets')
        .findOne({_id: new ObjectId(id)})
        .then(wallet => {
            return wallet;
        })
        .catch(err => console.log(err));
    }

    static fetchAll(user_id){
        const db = getDb();
        return db.collection('wallets').find({user_id: user_id}).toArray()
        .then(wallets => {
            return wallets;
        })
        .catch(err => console.log(err));
    }
// =========================== Transactions Method ====================
    addToTransactions(transaction) {
        let result = null
        if(!this.transactions){
            const myTransactions = []
            myTransactions.push(transaction._id)
            result = myTransactions;
        } else {
            const myTransactions = [... this.transactions.list]
            myTransactions.push(transaction._id)
            result = myTransactions;
        }
    
        const db = getDb();
        return db.collection('wallets')
        .updateOne({_id: new ObjectId(this._id)}, {$set: { transactions: {list: result}, acc_balance: this.acc_balance} })    
    }

    deleteFromTransactions(transaction_id) {
        const updatedTransactions = this.transactions.list.filter(transaction => {
            return (new ObjectId(transaction_id)).toString() !== transaction.toString()
        })
        const db = getDb();
        return db.collection('wallets')
        .updateOne({_id: this._id}, {$set: { transactions: {list: updatedTransactions}} })
    }
};