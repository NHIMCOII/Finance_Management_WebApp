const sql = require('mssql');
const config = require('../utils/dbconfig');

module.exports = class Income {
    constructor(category_id,name,income_id,amount,note,date,wallet_id) {
        this.category_id = category_id;
        this.name = name;
        this.income_id = income_id;
        this.amount = amount;
        this.note = note;
        this.date = date;
        this.wallet_id = wallet_id;
    }

    async save() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "INSERT INTO income (amount,note,date,wallet_id,category_id) VALUES (@amount,@note,@date,@wallet_id,@category_id)"
            let res = await pool.request()
            .input('amount', sql.Int, this.amount)
            .input('note', sql.NVarChar, this.note)
            .input('date', sql.Date, this.date)
            .input('wallet_id', sql.Int, this.wallet_id)
            .input('category_id', sql.Int, this.category_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    async update() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "UPDATE income SET amount = @amount, date = @date, wallet_id = @wallet_id, note = @note"
            let res = await pool.request()
            .input('amount', sql.Int, this.amount)
            .input('date', sql.Date, this.date)
            .input('wallet_id', sql.Int, this.wallet_id)
            .input('note', sql.NVarChar, this.note)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findByCategory(id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM users WHERE users.id = @id"
            let res = await pool.request()
            .input('id', sql.Int, id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findByEmail(email) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM users WHERE users.email = @email"
            let res = await pool.request()
            .input('email', sql.VarChar, email)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }
};