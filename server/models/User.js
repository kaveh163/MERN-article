const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
userSchema.methods.comparePassword = function (password) {
  return new Promise(async (resolve, reject) => {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return resolve(true);
    }
    return reject(new Error("Invalid password"));
  });
};
let User = mongoose.model("User", userSchema);
module.exports = User;
