const express = require('express');
const { body } = require("express-validator");

const transactionController = require('../controllers/transaction');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/incomes',isAuth,transactionController.getIncomes);

router.post('/income',isAuth,transactionController.postIncome);

router.get('/income/:income_id',isAuth,transactionController.detailsIncome);

router.delete('/income/:income_id',isAuth,transactionController.deleteIncome)

router.get('/expenses',isAuth,transactionController.getExpenses);

router.post('/expense',isAuth,transactionController.postExpense);

router.get('/expense/:expense_id',isAuth,transactionController.detailsExpense);

router.delete('/expense/:expense_id',isAuth,transactionController.deleteExpense)

module.exports = router;