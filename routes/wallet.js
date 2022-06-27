const path = require('path');

const express = require('express');

const walletController = require('../controllers/wallet');

const router = express.Router();

router.get('/editWallet',walletController.getEditWallet);

router.post('/editWallet',walletController.postEditWallet);

router.get('/moneyTransfer',walletController.getMoneyTransfer);

router.post('/moneyTransfer',walletController.postMoneyTransfer);

module.exports = router;