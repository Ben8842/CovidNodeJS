const mongoose = require("../db/db");
const schema = mongoose.Schema;
const user = new schema({
  email: String,
  username: String,
  password: String,
  location: String,
  age: Number,
});

module.exports = mongoose.model("user", user);
