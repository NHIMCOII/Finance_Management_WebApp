const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        process.env.SENDGRID_KEY,
    },
  })
);

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: hashedPw,
    });
    const savedUser = await user.save();
    res.status(201).json({ message: "User Created", userId: savedUser._id });
    transporter.sendMail({
      to: email,
      from: process.env.EMAIL,
      subject: "Signup Succeeded",
      html: "<h1>You successfully signed up!</h1>",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let loadedUser;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("An user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT,
      { expiresIn: "3h" }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.reset = async (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, async (error, buffer) => {
    try {
      if (error) {
        error.statusCode = 400;
        throw error;
      }
      const token = buffer.toString("hex");
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("An user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      user.save();
      res.status(200).json({ message: "Reset Token saved" });
      transporter.sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: "Password Reset",
        html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:8080/reset/${token}">link</a> to set a new password</p>
        `,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  });
};

exports.newPassword = async (req,res,next) => {
  try{
    const newPassword = req.body.newPassword
    const token = req.params.token
    const user = await User.findOne({resetToken: token,resetTokenExpiration: {$gt: Date.now()}})
    if (!user) {
      const error = new Error("Your reset token is expired !");
      error.statusCode = 401;
      throw error;
    }
    const hashedPw = await bcrypt.hash(newPassword,12)
    user.password = hashedPw
    user.resetToken = undefined
    user.resetTokenExpiration = undefined
    user.save()
    res.status(200).json({message: 'New password updated'})
    transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL,
      subject: "New password",
      html: "<p>You successfully updated new password</p>",
    });
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

