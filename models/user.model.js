const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, maxlength: 8 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
