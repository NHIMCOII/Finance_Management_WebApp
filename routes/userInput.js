const path = require('path');

const express = require('express');

const userInputController = require('../controllers/userInput');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/income',isAuth,userInputController.getIncome);

router.post('/income',userInputController.postIncome);

router.get('/expense',isAuth,userInputController.getExpense);

router.post('/expense',userInputController.postExpense);

router.get('/incomeDetails',isAuth,userInputController.getDetailsIncome);

router.post('/incomeDetails',userInputController.postDetailsIncome);

router.get('/expenseDetails',isAuth,userInputController.getDetailsExpense);

router.post('/expenseDetails',userInputController.postDetailsExpense);

module.exports = router;