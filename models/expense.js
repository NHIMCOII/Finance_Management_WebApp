const sql = require('mssql');
const config = require('../utils/dbconfig');

module.exports = class Expense {
    constructor(category_id,expense_id,amount,note,date,wallet_id) {
        this.category_id = category_id;
        this.expense_id = expense_id;
        this.amount = amount;
        this.note = note;
        this.date = date;
        this.wallet_id = wallet_id;
    }

    async save() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "INSERT INTO expenses (amount,note,date,wallet_id,category_id) VALUES (@amount,@note,@date,@wallet_id,@category_id)"
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
            const sqlString = "UPDATE expenses SET amount = @amount, date = @date, wallet_id = @wallet_id, note = @note"
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

    static async findByExpenseID(expense_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM expenses AS E, categories AS C, wallets AS W WHERE E.expense_id = @expense_id AND E.category_id = C.category_id AND E.wallet_id = W.wallet_id"
            let res = await pool.request()
            .input('expense_id', sql.Int, expense_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async deleteByExpenseID(expense_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "DELETE FROM expenses WHERE expense_id=@expense_id"
            let res = await pool.request()
            .input('expense_id', sql.Int, expense_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async sumOfExpenseByCategory(user_id, parent_id){
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT SUM(E.amount) AS total FROM expenses AS E, categories AS C, wallets AS W WHERE E.category_id = C.category_id AND C.parent_id = @parent_id AND E.wallet_id = W.wallet_id AND W.id = @user_id GROUP BY C.parent_id"
            let res = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('parent_id', sql.Int, parent_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async recentExpenses(user_id){
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT TOP 4 * FROM expenses AS E, categories AS C, wallets AS W WHERE E.category_id = C.category_id AND E.wallet_id = W.wallet_id AND W.id = @user_id AND E.category_id != 1 ORDER BY E.[date] DESC"
            let res = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async fetchAll(user_id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM expenses AS E, categories AS C, wallets AS W WHERE E.category_id = C.category_id AND E.wallet_id = W.wallet_id AND W.id = @user_id"
            let res = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }
};