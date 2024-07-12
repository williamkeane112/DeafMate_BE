require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const response = require("./response");
const cors = require("cors");

// router import
const user = require("./router/userRouter");

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    httpOnly: true,
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// router use
app.use("/user", user);

const verify = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) {
      response(401, null, "Invalid token. Please log in again.", res);
    } else {
      req.id = decoded.id;
      next();
    }
  });
};

app.get("", verify, (req, res) => {
  res.json({ msg: "SUCCESS", id: req.id });
});
app.listen(process.env.PORT, () => {
  console.log(`Listen in http://localhost:${process.env.PORT}`);
});
