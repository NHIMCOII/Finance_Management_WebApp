const express = require('express');
const { body } = require("express-validator");

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/profile',isAuth,userController.profile);

router.put('/editProfile',isAuth,
// [
//     body("username").trim().isAlpha(),
//     body("email").trim().isEmail().not().isEmpty(),
//     body("firstName").trim().isAlpha(),
//     body("lastName").trim().isAlpha(),
//     body("gender").trim().isBoolean(),
//     body("job").trim().isAlpha(),
//     body("phone").trim().isMobilePhone(),
//     body("dob").trim().isDate(),
//     body("facebook").trim().isURL(),
//     body("linkedin").trim().isURL(),
//     body("address").trim().isAlpha()
// ],
userController.editProfile);

// router.get('/dashboard',isAuth,userController.getDashboard);   


module.exports = router;