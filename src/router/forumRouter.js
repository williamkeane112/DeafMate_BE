const express = require("express");
const router = express.Router();
const forumController = require("../controller/forumController");

// router
router.get("/getData",forumController.getAllDataForum);
router.post("/create",forumController.createForum);

module.exports = router;
