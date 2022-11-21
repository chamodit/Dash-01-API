const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
      type: String,
      /*validate: {
        validator: function (val) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: "{VALUE} is not a valid Email!",
      },*/
      required: true,
      unique: true,
    },
    password: {
      type: String,
      validate: {
        validator: function (v) {
          return /((?=.*[a-z])(?=.*[@#$%!]).{6,40})/.test(v);
        },
        message: "{VALUE} is not a valid password!",
      },
      required: [true, "User password required"],
    },
    confirmPw: { type: String },
    saltSecret: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("user", userSchema);
