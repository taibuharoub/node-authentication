const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    googleId: String,
    name: String,
    username: String,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
