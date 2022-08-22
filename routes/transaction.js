const path = require('path');

const express = require('express');

const transactionController = require('../controllers/transaction');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/income',isAuth,transactionController.getIncome);

router.post('/income',transactionController.postIncome);

router.get('/expense',isAuth,transactionController.getExpense);

router.post('/expense',transactionController.postExpense);

router.get('/incomeDetails/:income_id',isAuth,transactionController.getDetailsIncome);

router.post('/removeIncome',transactionController.postDeleteIncome)

router.get('/expenseDetails/:expense_id',isAuth,transactionController.getDetailsExpense);

router.post('/removeExpense',transactionController.postDeleteExpense)

module.exports = router;