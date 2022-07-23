const path = require('path');

const express = require('express');

const indexController = require('../controllers/index');
const isAuth = require('../midleware/is-auth');

const router = express.Router();

router.get('/profile',isAuth,indexController.getProfile);

router.post('/profile',isAuth,indexController.postProfile);

router.get('/editProfile',isAuth,indexController.getEditProfile);

router.post('/editProfile',isAuth,indexController.postEditProfile);

router.get('/dashboard',isAuth,indexController.getDashboard);   

router.get('/',indexController.getIndex);

module.exports = router;