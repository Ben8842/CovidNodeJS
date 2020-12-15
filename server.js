//postman http://localhost:5000/users

//const { response } = require("express");
const express = require("express");
const { getMaxListeners } = require("./models/user");
const user = require("./models/user");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

app.get("/users", (req, res) => {
  console.log("finding");
  user.find(
    {
      password: "coat",
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
  user.findOne(
    {
      email: req.body.email,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error during finding");
      } else if (data == null) {
        console.log("null!" + data);
        userObject.save(function (error) {
          console.log("done.");
          console.log(error);
          if (error) {
            console.log("issues here:" + error);
            return res.status(500).send("Server Error while saving");
          } else {
            return res.status(201).send("user saved");
          }
          return;
        });

        //res.json(data);
      } else if (data != null) {
        console.log("not null!" + data);
        console.log("duplicate !! (email)");
        return res.status(400).send("duplicate email record");
      }
    }
  );
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
