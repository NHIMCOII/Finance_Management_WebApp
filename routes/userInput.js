const path = require('path');

const express = require('express');

const userInputController = require('../controllers/userInput');

const router = express.Router();

router.get('/income',userInputController.getIncome);

router.post('/income',userInputController.postIncome);

router.get('/expense',userInputController.getExpense);

router.post('/expense',userInputController.postExpense);

module.exports = router;