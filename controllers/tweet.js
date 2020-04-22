const Tweet = require("../models/tweet");
const User = require("../models/user");
const Notification = require("../models/notification");

exports.getHome = async (req, res, next) => {
  if (!req.session.isLogin) return res.redirect("/signup");

  try {
    const tweets = await Tweet.fetchAll();

    res.render("home", {
      pageTitle: "Twitter",
      path: "/",
      tweets,
      currentUser: req.session.user,
    });
  } catch (err) {
    return next(new Error("Server Error"));
  }
};

exports.postTweet = async (req, res, next) => {
  const { tweet } = req.body;

  try {
    const newTweet = new Tweet(tweet, req.session.user);
    await newTweet.save();
  } catch (err) {
    return next(new Error("Server Error"));
  }

  res.redirect("/");
};

exports.postToggleLikeTweet = async (req, res, next) => {
  const { id, likes, email } = req.body;

  try {
    const result = await Tweet.toggleLike(id, likes);

    let text;
    if (likes.includes(req.session.user.email)) {
      text = "liked";
    } else {
      text = "disliked";
    }

    if (req.session.user.email !== email) {
      const notification = new Notification(text, req.session.user, id, email);
      await notification.save();
    }

    res.status(200).json({ message: "Success!" });
  } catch (err) {
    next(new Error("Server Error"));
  }
};

exports.postComment = async (req, res, next) => {
  const { id, comments, email } = req.body;

  try {
    const result = await Tweet.addComment(id, comments);

    if (req.session.user.email !== email) {
      const notification = new Notification(
        "commented on",
        req.session.user,
        id,
        email
      );
      await notification.save();
    }

    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(new Error("Server Error"));
  }
};

exports.getProfile = async (req, res, next) => {
  if (!req.session.isLogin) return res.redirect("/signup");

  try {
    const { id } = req.params;
    const tweets = await Tweet.fetchByUserId(id);
    const user = await User.findById(id);

    res.render("profile", {
      pageTitle: user.name + " - Twitter",
      path: "/profile/" + id,
      tweets,
      user,
      currentUser: req.session.user,
    });
  } catch (err) {
    next(new Error("Server Error"));
  }
};

exports.getTweet = async (req, res, next) => {
  const { user, isLogin } = req.session;
  if (!isLogin) return res.redirect("/signup");

  try {
    const { id } = req.params;

    const tweet = await Tweet.fetchById(id);

    res.render("single-tweet", {
      pageTitle: "Tweet - Twitter",
      path: "/tweet",
      currentUser: user,
      tweet,
    });
  } catch (err) {
    next(new Error("Server Error"));
  }
};
