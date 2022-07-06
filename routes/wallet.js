const path = require('path');

const express = require('express');

const walletController = require('../controllers/wallet');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/editWallet',isAuth,walletController.getEditWallet);

router.post('/editWallet',walletController.postEditWallet);

router.get('/moneyTransfer',isAuth,walletController.getMoneyTransfer);

router.post('/moneyTransfer',walletController.postMoneyTransfer);

module.exports = router;