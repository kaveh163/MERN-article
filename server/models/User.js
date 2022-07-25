const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: [true, "name is required"] },
  lastname: { type: String, required: [true, "lastname is required"] },
  password: { type: String, required: [true, "password is required"] },
  email: { type: String, required: [true, "email is required"] },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});
let User = mongoose.model("User", userSchema);
module.exports = User;
