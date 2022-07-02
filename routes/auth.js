const path = require("path");
const { check, body } = require("express-validator");

const express = require("express");

const authController = require("../controllers/auth");
const indexController = require("../controllers/index");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address is forbidden");
        }
        return true;
      }),
    body('password','Plese enter a password at least 5 characters long without special characters')
    .isLength({min: 5})
    .isAlphanumeric(),
    body('confirmPasswowrd').custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords have to match');
        }
        return true;
    })
  ],
  authController.postSignup
);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

module.exports = router;
