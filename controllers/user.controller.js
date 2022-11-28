const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { user } = require("../models");

const signUp = (req, res) => {
  if (!req.body.fname) {
    return res.status(400).json({
      success: false,
      message: "First name cannot be blank",
    });
  }

  if (!req.body.lname) {
    return res.status(400).json({
      success: false,
      message: "Last name cannot be blank",
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "Email is undefined",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Password is undefined",
    });
  }

  if (req.body.password !== req.body.confirmPw) {
    return res.status(400).json({
      success: false,
      message: "Password is not matching",
    });
  }

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then((user) =>
          res.json({
            success: true,
            user,
          })
        )
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        });
    });
  });
};

const signIn = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "Email is undefined",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Password is undefined",
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  });
};

module.exports = {
  signUp,
  signIn,
};
