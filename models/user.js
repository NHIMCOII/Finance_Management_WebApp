const getDb = require('../utils/database').getDb;

class User {
    constructor(username,email,password,firstName,lastName,gender,dob,phone,job,facebook,linkedin,address) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob ;
        this.phone = phone;
        this.job = job;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.address = address;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
    }

    update(id) {
        const db = getDb();
        return db.collection('users')
        .updateOne({_id: id}, {$set: this })
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

};

module.exports = User;