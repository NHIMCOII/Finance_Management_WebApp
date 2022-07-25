const sql = require('mssql');
const config = require('../utils/dbconfig');

module.exports = class Wallet {
    constructor(wallet_id,id,name,type,acc_balance,percentage,period, note) {
        this.wallet_id = wallet_id;
        this.id = id;
        this.name = name;
        this.type = type;
        this.acc_balance = acc_balance;
        this.percentage = percentage;
        this.period = period;
        this.note = note;
    }

    async save() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "INSERT INTO wallets (id,name,type,acc_balance,percentage,period) VALUES (@id,@name,@type,@acc_balance,@percentage,@period)"
            let res = await pool.request()
            .input('id', sql.Int, this.id)
            .input('name', sql.NVarChar, this.name)
            .input('type', sql.NVarChar, this.type)
            .input('acc_balance', sql.Int, this.acc_balance)
            .input('percentage', sql.Float, this.percentage)
            .input('period', sql.Int, this.period)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    async update() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "UPDATE wallets SET name = @name, type = @type, acc_balance = @acc_balance, percentage = @percentage, period = @period  WHERE wallet_id = @wallet_id"
            let res = await pool.request()
            .input('name', sql.NVarChar, this.name)
            .input('type', sql.NVarChar, this.type)
            .input('acc_balance', sql.Int, this.acc_balance)
            .input('percentage', sql.Float, this.percentage)
            .input('period', sql.Int, this.period)
            .input('wallet_id', sql.Int, this.wallet_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async DeleteWallet(wallet_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "DELETE FROM wallets WHERE wallet_id=@wallet_id"
            let res = await pool.request()
            .input('wallet_id', sql.Int, wallet_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findByPk(wallet_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM wallets WHERE wallet_id = @wallet_id"
            let res = await pool.request()
            .input('wallet_id', sql.Int, wallet_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findByUserId(user_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM wallets WHERE id = @user_id"
            let res = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findRecentTransactions(wallet_id){
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM wallets AS W,categories AS C,incomes AS I,expenses AS E WHERE I.wallet_id = W.wallet_id AND E.wallet_id = W.wallet_id AND (I.category_id = C.category_id OR E.category_id = C.category_id)"
            let res = await pool.request()
            .input('wallet_id', sql.Int, wallet_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async fetchAll(user_id){
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM wallets where id = @user_id"
            let res = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }
};