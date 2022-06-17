const path = require('path');

const express = require('express');

const indexController = require('../controllers');

const router = express.Router();

router.get('/signup',indexController.getSignUp);

router.get('/login',indexController.getSignIn);

router.get('/dashboard',indexController.getDashboard);

router.get('/',indexController.getIndex);

module.exports = router;