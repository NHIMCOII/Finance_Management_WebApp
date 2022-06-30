const path = require('path');

const express = require('express');

const userInputController = require('../controllers/userInput');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/income',isAuth,userInputController.getIncome);

router.post('/income',userInputController.postIncome);

router.get('/expense',isAuth,userInputController.getExpense);

router.post('/expense',userInputController.postExpense);

module.exports = router;