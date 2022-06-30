const path = require('path');

const express = require('express');

const indexController = require('../controllers/index');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/profile',isAuth,indexController.getProfile);

router.get('/dashboard',indexController.getDashboard);   //protect route

router.get('/',indexController.getIndex);

module.exports = router;