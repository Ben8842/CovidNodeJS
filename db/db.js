const Mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/CovidNodeJS";

Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = Mongoose.connection;
connection.once("open", function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connection established");
  }
});

module.exports = Mongoose;
