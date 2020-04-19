const express = require("express");
const userController = require("../controllers/user");
const signupValidator = require("../validators/signupValidator");
const loginValidator = require("../validators/loginValidator");

const router = express.Router();

router.get("/signup", userController.getSignup);

router.post("/signup", signupValidator, userController.postSignup);

router.get("/login", userController.getLogin);

router.post("/login", loginValidator, userController.postLogin);

router.post("/logout", userController.postLogout);

router.get("/edit-profile", userController.getEditProfile);

router.post("/edit-profile", userController.postEditProfile);

module.exports = router;
