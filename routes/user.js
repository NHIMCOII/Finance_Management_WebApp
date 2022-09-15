const express = require('express');
const { body } = require("express-validator");

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/profile',isAuth,userController.profile);

router.put('/editProfile',isAuth,
[
    body("username").trim().isAlpha().isLength({min: 5},{max: 20}),
    body("email").trim().isEmail().normalizeEmail(),
    body("firstName").trim().isAlpha().optional({ nullable: true ,checkFalsy: true}),
    body("lastName").trim().isAlpha().optional({ nullable: true ,checkFalsy: true}),
    body("gender").trim().isBoolean().optional({ nullable: true ,checkFalsy: true}),
    body("job").trim().isAlpha().optional({ nullable: true ,checkFalsy: true}),
    body("phone").trim().isMobilePhone().optional({ nullable: true ,checkFalsy: true}),
    body("dob").trim().isDate().optional({ nullable: true ,checkFalsy: true}),
    body("facebook").trim().isURL().optional({ nullable: true ,checkFalsy: true}),
    body("linkedin").trim().isURL().optional({ nullable: true ,checkFalsy: true}),
    body("address").trim().isAlpha().optional({ nullable: true ,checkFalsy: true})
],
userController.editProfile);  

module.exports = router;