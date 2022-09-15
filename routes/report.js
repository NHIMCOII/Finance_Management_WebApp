const express = require('express');

const reportController = require('../controllers/report');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/dashboard',isAuth,reportController.dashboard); 

router.get('/monthlyBalance',isAuth,reportController.monthlyBalance);

module.exports = router;