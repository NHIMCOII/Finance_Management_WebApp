const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "User fetched", user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editProfile = async (req, res, next) => {
  const updatedUsername = req.body.username;
  const updatedEmail = req.body.email;
  const updatedFirstName = req.body.firstName;
  const updatedLastName = req.body.lastName;
  const updatedGender = Boolean(req.body.gender);
  const updatedJob = req.body.job;
  const updatedPhone = req.body.phone;
  let updatedDob = req.body.dob;
  const updatedFacebook = req.body.facebook;
  const updatedLinkedin = req.body.linkedin;
  const updatedAddress = req.body.address;

  if (updatedDob === "") {
    updatedDob = null;
  }
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    user.username = updatedUsername;
    user.email = updatedEmail;
    user.firstName = updatedFirstName;
    user.lastName = updatedLastName;
    user.gender = updatedGender;
    user.job = updatedJob;
    user.phone = updatedPhone;
    user.dob = updatedDob;
    user.facebook = updatedFacebook;
    user.linkedin = updatedLinkedin;
    user.address = updatedAddress;
    const updatedUser = await user.save();
    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
