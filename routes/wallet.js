const express = require('express');

const walletController = require('../controllers/wallet');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/list',isAuth,walletController.myWallet);

router.post('/add',isAuth,walletController.addWallet);

router.put('/edit/:wallet_id',isAuth,walletController.editWallet);

router.delete('/delete/:wallet_id',isAuth,walletController.deleteWallet);

router.get('/transfers',isAuth,walletController.getTransfers);

router.post('/transfer',isAuth,walletController.postTransfers);

router.get('/transfer/:transfer_id',isAuth,walletController.detailsTransfer);

 
module.exports = router;