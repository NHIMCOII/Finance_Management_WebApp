const { ObjectId } = require('mongodb');

const getDb = require('../utils/database').getDb;

module.exports = class User {
    constructor(username,email,password,firstName,lastName,gender,dob,phone,job,facebook,linkedin,address,myWallets,id) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = new Date(dob) ;
        this.phone = phone;
        this.job = job;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.address = address;
        this.myWallets = myWallets;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
    }

    update() {
        const db = getDb();
        return db.collection('users')
        .updateOne({_id: new ObjectId(this._id)}, {$set: this })
    }
    
    static findByPk(id) {
        const db = getDb();
        return db.collection('users')
        .findOne({_id: id});
    }

    static findByEmail(email) {
        const db = getDb();
        return db.collection('users')
        .findOne({email: email});
    }


//     static async findRecentTransactions(id){
//         try{
//             let pool = await sql.connect(config);
//             const sqlString = "SELECT * FROM users WHERE users.email = @email"
//             let res = await pool.request()
//             .input('email', sql.VarChar, email)
//             .query(sqlString);
//             return res.recordsets;
//         } catch (error){
//             console.log(" mathus-error :" + error);
//         }
//     }

//     static async income_per_month(id, month) {
//         try{
//             let pool = await sql.connect(config);
//             const sqlString = "SELECT SUM(amount) AS amount FROM incomes AS I,wallets AS W,users AS U WHERE U.id=@id AND U.id = W.id AND I.wallet_id = W.wallet_id AND I.category_id != 1 AND MONTH(I.date)=@month"
//             let res = await pool.request()
//             .input('id', sql.INT, id)
//             .input('month', sql.INT, month)
//             .query(sqlString);
//             return res.recordsets;
//         } catch (error){
//             console.log(" mathus-error :" + error);
//         }
//     }
// // except money transfer
//     static async expense_per_month(id, month) {
//         try{
//             let pool = await sql.connect(config);
//             const sqlString = "SELECT SUM(amount) AS amount FROM expenses AS E,wallets AS W,users AS U WHERE U.id=@id AND U.id = W.id AND E.wallet_id = W.wallet_id AND E.category_id != 1 AND MONTH(E.date)=@month"
//             let res = await pool.request()
//             .input('id', sql.INT, id)
//             .input('month', sql.INT, month)
//             .query(sqlString);
//             return res.recordsets;
//         } catch (error){
//             console.log(" mathus-error :" + error);
//         }
//     }
// ==================== Wallet Method ===================

    addToMyWallets(wallet) {
        let result = null
        if(!this.myWallets){
            const myWallets = []
            myWallets.push(new ObjectId(wallet._id))   
            result = myWallets;

        } else {
            const myWallets = [... this.myWallets.list]
            myWallets.push(new ObjectId(wallet._id))
            result = myWallets;
        }

        const db = getDb();
        return db.collection('users')
        .updateOne({_id: new ObjectId(this._id)}, {$set: { myWallets: {list: result}} })    
    }

    deleteFromMyWallets(wallet_id) {
        const updatedMyWallets = this.myWallets.list.filter(wallet => {
            return new ObjectId(wallet_id).toString() !== wallet.toString()
        })
        const db = getDb();
        return db.collection('users')
        .updateOne({_id: this._id}, {$set: { myWallets: {list: updatedMyWallets ? updatedMyWallets : null}} })
    }
};