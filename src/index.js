require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./config");

// router import
const user = require("./router/userRouter");
const moduleRouter = require("./router/moduleRouter");
const forumRouter = require("./router/forumRouter");
const commentRouter = require("./router/commentRouter");

const app = express();
app.use(bodyParser.json());
app.use("/public", express.static("public"));

app.use(
  cors({
    origin: "http://http://192.168.135.169:8081",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// router use
app.use("/user", user);
app.use("/module", moduleRouter);
app.use("/forum", forumRouter);
app.use("/comment", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listen in http://localhost:${process.env.PORT}`);
});
