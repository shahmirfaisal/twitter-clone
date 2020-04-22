const express = require("express");
const tweetController = require("../controllers/tweet");

const router = express.Router();

router.get("/", tweetController.getHome);

router.post("/tweet", tweetController.postTweet);

router.post("/toggle-like-tweet", tweetController.postToggleLikeTweet);

router.post("/comment", tweetController.postComment);

router.get("/profile/:id", tweetController.getProfile);

router.get("/tweet/:id", tweetController.getTweet);

module.exports = router;
