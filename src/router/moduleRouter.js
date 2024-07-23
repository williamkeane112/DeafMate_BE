const express = require("express");

const router = express.Router();

const moduleController = require("../controller/moduleController");

router.post("/getData", moduleController.getDataModule);


module.exports = router;
