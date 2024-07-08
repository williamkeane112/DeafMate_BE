require("dotenv").config();
const express = require("express");

const app = express();

// router import

const user = require("./router/userRouter");

// router use

app.use("/", user);

app.listen(process.env.PORT, () => {
  console.log(`Listen in http://localhost:${process.env.PORT}`);
});
