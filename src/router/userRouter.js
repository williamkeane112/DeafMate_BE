const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.get("", test.register);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/userInfo", userController.userInfo);

module.exports = router;
