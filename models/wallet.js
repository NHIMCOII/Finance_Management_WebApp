const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb')

module.exports = class Wallet {
    constructor(user_id,name,type,acc_balance,percentage,period) {
        this.user_id = user_id;
        this.name = name;
        this.type = type;
        this.acc_balance = acc_balance;
        this.percentage = percentage;
        this.period = period;
    }

    save() {
        const db = getDb();
        return db.collection('wallets').insertOne(this)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
    }

    update(id) {
        const db = getDb();
        return db.collection('wallets')
        .updateOne({_id: new mongodb.ObjectId(id)}, {$set: this })
    }

    static DeleteWallet(id) {
        const db = getDb();
        return db.collection('wallets').deleteOne({_id: new mongodb.ObjectId(id)})
        .then(() => {
            console.log('Deleted')
        })
        .catch(err => console.log(err))
    }

    static findByPk(id) {
        const db = getDb();
        return db.collection('wallets')
        .findOne({_id: new mongodb.ObjectId(id)})
        .then(wallet => {
            return wallet;
        })
        .catch();
    }

    // static async findRecentTransactions(wallet_id){
    //     try{
    //         let pool = await sql.connect(config);
    //         const sqlString = "SELECT * FROM wallets AS W,categories AS C,incomes AS I,expenses AS E WHERE I.wallet_id = W.wallet_id AND E.wallet_id = W.wallet_id AND (I.category_id = C.category_id OR E.category_id = C.category_id)"
    //         let res = await pool.request()
    //         .input('wallet_id', sql.Int, wallet_id)
    //         .query(sqlString);
    //         return res.recordsets;
    //     } catch (error){
    //         console.log(" mathus-error :" + error);
    //     }
    // }

    static fetchAll(user_id){
        const db = getDb();
        return db.collection('wallets').find({user_id: user_id}).toArray()
        .then(products => {
            return products;
        })
        .catch(err => console.log(err));
    }
};