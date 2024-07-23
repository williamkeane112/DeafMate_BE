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

app.get("/module/getDataById/:id", (req, res) => {
  const belajar = req.params.id;
  console.log(belajar);
  const query = `SELECT * FROM module WHERE id= ?`;

  db.query(query, [belajar], (err, result) => {
    if (err) return res.status(500).json({ status: "Error", message: "Error Get data" });

    if (result.length > 0) {
      result[0].videos = `http://192.168.135.169:3000/public/hallo.gif`;
    }
    return res.status(200).json({ message: "Get Data User By Id Successfully", payload: result[0] });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listen in http://localhost:${process.env.PORT}`);
});
