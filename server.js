const { response } = require("express");
const express = require("express");
const user = require("./models/user");

const app = express();
app.use(express.json());
app.get("/users", (req, res) => {
  console.log("finding");
  user.find(
    {
      email: "superboat@gmail.com",
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});
app.post("/users", (req, res) => {
  console.log("posting");
  console.log(req.body.email);
  const body = req.body;
  const userObject = new user(body);
  userObject.save(function (error) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send("user saved");
    }
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Hello Server Running on " + port);
});

/*const userOne = new user({
    email: "superboat@gmail.com",
    username: "superBoats",
    password: "water",
  });
  const userTwo = new user({
    email: "superplane@gmail.com",
    username: "superplanes",
    password: "waters",
  });

  userOne.save(function (error) {
    if (error) {
      console.log(error);
    }
  });*/
