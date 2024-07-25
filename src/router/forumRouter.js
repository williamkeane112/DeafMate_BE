const express = require("express");
const multer = require("multer");
const path = require("path");
const forumController = require("../controller/forumController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/forum");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// router
router.get("/getData", forumController.getAllDataForum);

router.get("/getDataForumByID/:id", forumController.getDataByID);

router.post("/create", upload.single("img"), forumController.createForum);

module.exports = router;
