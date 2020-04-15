const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/signup", userController.getSignup);

router.get("/login", userController.getLogin);

module.exports = router;
