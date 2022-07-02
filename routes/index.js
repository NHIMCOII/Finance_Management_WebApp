const path = require('path');

const express = require('express');

const indexController = require('../controllers/index');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/profile',isAuth,indexController.getProfile);

router.get('/dashboard',isAuth,indexController.getDashboard);   

router.get('/',indexController.getIndex);

module.exports = router;