const path = require('path');

const express = require('express');

const reportController = require('../controllers/report');

const router = express.Router();

router.get('/monthlyBalance',reportController.getMonthlyBalance);

module.exports = router;