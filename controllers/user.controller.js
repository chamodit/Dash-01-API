const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const secretOrKey = require("../config/keys").secretOrKey;

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
      message: "Email cannot be blank",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Password cannot be blank",
    });
  }

  if (!req.body.confirmPw) {
    return res.status(400).json({
      success: false,
      message: "Should be same as the password",
    });
  }

  const newUser = new User(req.body);

  newUser.save().then((result) => {
    res
      .status(200)
      .json({
        success: true,
        data: result,
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  });
};

const login = (req, res) => {
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

  User.find({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
        };
      } else {
        return res.status(400).json({
          success: false,
          message: "Password is incorrect",
        });
      }
    });
  });
};

module.exports = {
  signUp,
  login,
};
