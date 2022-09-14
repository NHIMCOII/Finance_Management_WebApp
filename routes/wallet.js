const path = require('path');

const express = require('express');

const walletController = require('../controllers/wallet');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/list',isAuth,walletController.myWallet);

router.post('/add',isAuth,walletController.addWallet);

router.put('/edit/:wallet_id',isAuth,walletController.editWallet);

router.delete('/delete/:wallet_id',isAuth,walletController.deleteWallet);

// router.get('/moneyTransfer',isAuth,walletController.getMoneyTransfer);

// router.post('/moneyTransfer',walletController.postMoneyTransfer);

module.exports = router;