const express = require("express");
const tweetController = require("../controllers/tweet");

const router = express.Router();

router.get("/", tweetController.getHome);

module.exports = router;
