const sql = require('mssql');
const config = require('../utils/dbconfig');

module.exports = class Wallet {
    constructor(wallet_id,user_id,name,type,acc_balance,percentage,period) {
        this.wallet_id = wallet_id;
        this.user_id = user_id;
        this.name = name;
        this.type = type;
        this.acc_balance = acc_balance;
        this.percentage = percentage;
        this.period = period;
    }

    async save() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "INSERT INTO wallets (name,type,acc_balance,percentage,period)) VALUES (@name,@type,@acc_balance,@percentage,@period)"
            let res = await pool.request()
            .input('name', sql.VarChar, this.name)
            .input('type', sql.VarChar, this.type)
            .input('acc_balance', sql.Float, this.acc_balance)
            .input('percentage', sql.Float, this.percentage)
            .input('period', sql.Int, this.acc_period)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    async update(wallet_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "UPDATE wallets SET name = @name, type = @type, acc_balance = @acc_balance, percentage = @percentage, period = @period  WHERE wallet_id = @wallet_id"
            let res = await pool.request()
            .input('name', sql.VarChar, this.name)
            .input('type', sql.VarChar, this.type)
            .input('acc_balance', sql.Float, this.acc_balance)
            .input('percentage', sql.Float, this.percentage)
            .input('period', sql.Int, this.period)
            .input('wallet_id', sql.Int, this.wallet_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    async DeleteWallet(wallet_id) {
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
            const sqlString = "SELECT * FROM wallets WHERE  user_id = @user_id"
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
            const sqlString = ""
            let res = await pool.request()
            .input('wallet_id', sql.Int, wallet_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
        
    }
};