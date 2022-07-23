const path = require('path');

const express = require('express');

const walletController = require('../controllers/wallet');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/myWallets',isAuth,walletController.getMyWallet);

router.get('/addWallet',isAuth,walletController.getAddWallet);

router.post('/addWallet',walletController.postAddWallet);

router.get('/editWallet/:wallet_id',isAuth,walletController.getEditWallet);

router.post('/editWallet',walletController.postEditWallet);

router.get('/moneyTransfer',isAuth,walletController.getMoneyTransfer);

router.post('/moneyTransfer',walletController.postMoneyTransfer);

router.post('/removeWallet',walletController.postRemoveWallet);

module.exports = router;