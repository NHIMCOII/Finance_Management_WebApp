const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();
router.put(
  "/signup",
  [
    body('username').trim().isLength({min: 5},{max: 20}),

    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
      
    body(
      "password",
      "Plese enter a password at least 5 characters long without special characters"
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match");
        }
        return true;
      }),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email", "Invalid email").isEmail().normalizeEmail(),
    body(
      "password",
      "Password must have at least 5 characters long and does not contain special characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.login
);

// router.post("/reset",[
//   body("email").isEmail().normalizeEmail()
// ], authController.reset);

// router.put("/reset/:token", [
//   body(
//     "password",
//     "Password must have at least 5 characters long and does not contain special characters"
//   )
//     .isLength({ min: 5 })
//     .isAlphanumeric()
//     .trim(),
// ],authController.newPassword);

module.exports = router;
