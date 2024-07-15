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
    origin: "http://http://192.168.135.169:8081",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/", (req, res) => {
  res.send("hello word");
});
// router use
app.use("/user", user);

app.listen(process.env.PORT, () => {
  console.log(`Listen in http://localhost:${process.env.PORT}`);
});
