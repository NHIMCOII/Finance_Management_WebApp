const path = require('path');

const express = require('express');

const walletController = require('../controllers/wallet');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/myWallets',isAuth,walletController.getMyWallet);

router.get('/addWallet',isAuth,walletController.getAddWallet);

router.post('/addWallet',walletController.postAddWallet);

router.get('/editWallet/:wallet_id',isAuth,walletController.getEditWallet);

router.post('/editWallet/:wallet_id',walletController.postEditWallet);

router.get('/moneyTransfer',isAuth,walletController.getMoneyTransfer);

router.post('/moneyTransfer',walletController.postMoneyTransfer);

router.delete('/deleteWallet/:wallet_id',walletController.deleteWallet);

module.exports = router;