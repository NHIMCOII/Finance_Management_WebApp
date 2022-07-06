const path = require('path');

const express = require('express');

const reportController = require('../controllers/report');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/monthlyBalance',isAuth,reportController.getMonthlyBalance);

module.exports = router;