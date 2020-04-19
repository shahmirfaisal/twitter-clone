const Tweet = require("../models/tweet");
const User = require("../models/user");

exports.getHome = async (req, res, next) => {
  if (!req.session.isLogin) return res.redirect("/signup");

  const tweets = await Tweet.fetchAll();

  console.log(tweets);

  res.render("home", {
    pageTitle: "Twitter",
    path: "/",
    tweets,
    currentUser: req.session.user,
  });
};

exports.postTweet = async (req, res, next) => {
  const { tweet } = req.body;

  const newTweet = new Tweet(tweet, req.session.user);
  await newTweet.save();

  res.redirect("/");
};

exports.postToggleLikeTweet = async (req, res, next) => {
  const { id, likes } = req.body;
  const result = await Tweet.toggleLike(id, likes);
  res.status(200).json({ message: "Success!" });
};

exports.postComment = async (req, res, next) => {
  const { id, comments } = req.body;
  const result = await Tweet.addComment(id, comments);
  console.log("Comments", comments);
  res.status(200).json({ message: "Success" });
};

exports.getProfile = async (req, res, next) => {
  if (!req.session.isLogin) return res.redirect("/signup");

  const { id } = req.params;
  const tweets = await Tweet.fetchByUserId(id);
  const user = await User.findById(id);

  await res.render("profile", {
    pageTitle: user.name + " - Twitter",
    path: "/profile/" + id,
    tweets,
    user,
    currentUser: req.session.user,
  });
};
