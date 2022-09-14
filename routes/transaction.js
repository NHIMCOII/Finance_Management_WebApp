const express = require('express');
const { body } = require("express-validator");

const transactionController = require('../controllers/transaction');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/income',isAuth,transactionController.getIncome);

// router.post('/income',transactionController.postIncome);

// router.get('/expense',isAuth,transactionController.getExpense);

// router.post('/expense',transactionController.postExpense);

// router.get('/incomeDetails/:income_id',isAuth,transactionController.getDetailsIncome);

// router.delete('/incomeDetails/:income_id',transactionController.deleteIncome)

// router.get('/expenseDetails/:expense_id',isAuth,transactionController.getDetailsExpense);

// router.delete('/expenseDetails/:expense_id',transactionController.deleteExpense)

module.exports = router;