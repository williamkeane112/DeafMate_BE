const express = require("express");

const router = express.Router();

// controller
const commentController = require("../controller/commentController");

router.post("/create", commentController.createComment);
router.get("/show", commentController.showComment);

module.exports = router;
