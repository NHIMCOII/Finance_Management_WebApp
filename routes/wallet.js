const path = require('path');

const express = require('express');

const walletController = require('../controllers/wallet');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/myWallet',isAuth,walletController.getMyWallet);

router.get('/addWallet',walletController.getAddWallet);

router.post('/addWallet',walletController.postAddWallet);

router.get('/moneyTransfer',isAuth,walletController.getMoneyTransfer);

router.post('/moneyTransfer',walletController.postMoneyTransfer);

module.exports = router;