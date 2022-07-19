const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: [true, "name is required"] },
  lastname: { type: String, required: [true, "lastname is required"]},
  password: { type: String, required: [true, "password is required"]},
  confirmPass: {type: String, required: [true, "password should be confirmed"]},
  email: {type: String, required: [true, "email is required"]}, 
});

let User = mongoose.model('User', userSchema);
module.exports = User;
