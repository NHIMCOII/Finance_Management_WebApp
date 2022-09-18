const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  gender: {
    type: Boolean,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  myWallets: {
    list: [{ type: Schema.Types.ObjectId, ref: "Wallet", required: false }],
  },
});

module.exports = mongoose.model("User", userSchema);