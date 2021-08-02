const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const secret = "iysjkdkdlke773hdh";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

//encrypt the entire db
// userSchema.plugin(encrypt, { secret: secret });
//encrypt a single field
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

module.exports = mongoose.model("User", userSchema);
