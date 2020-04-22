const { validationResult } = require("express-validator/check");
const User = require("../models/user");
const Tweet = require("../models/tweet");
const Notification = require("../models/notification");

exports.getSignup = (req, res, next) => {
  if (req.session.isLogin) return res.redirect("/");

  res.render("signup", {
    pageTitle: "Sign up for Twitter",
    error: null,
    oldInput: {
      name: "",
      username: "",
      email: "",
    },
  });
};

exports.postSignup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("signup", {
      pageTitle: "Sign up for Twitter",
      error: errors.array()[0].msg,
      oldInput: {
        name,
        username,
        email,
      },
    });
  }

  try {
    const user = new User(name, username, email, password);
    const newUser = await user.save();
    req.session.user = newUser;
    req.session.isLogin = true;
    req.session.save((err) => {
      res.redirect("/");
    });
  } catch (err) {
    next(new Error("Server Error"));
  }
};

exports.getLogin = (req, res, next) => {
  if (req.session.isLogin) return res.redirect("/");

  res.render("login", {
    pageTitle: "Log in on Twitter",
    error: null,
    oldInput: {
      username_email: "",
    },
  });
};

exports.postLogin = async (req, res, next) => {
  const { username_email } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("login", {
      pageTitle: "Log in on Twitter",
      error: errors.array()[0].msg,
      oldInput: {
        username_email,
      },
    });
  }

  try {
    const user = await User.findByUsername(username_email);
    if (user) {
      req.session.user = user;
    } else {
      const user = await User.findByEmail(username_email);
      req.session.user = user;
    }
    req.session.isLogin = true;
    req.session.save((err) => {
      res.redirect("/");
    });
  } catch (err) {
    next(new Error("Server Error"));
  }
};

exports.postLogout = (req, res, next) => {
  req.session.user = null;
  req.session.isLogin = false;
  req.session.save((err) => {
    res.redirect("/signup");
  });
};

exports.getEditProfile = (req, res, next) => {
  const { user, isLogin } = req.session;

  if (!isLogin) return res.redirect("/signup");

  res.render("edit-profile", {
    pageTitle: "Edit Profile - Twitter",
    path: "/edit-profile",
    currentUser: user,
  });
};

exports.postEditProfile = async (req, res, next) => {
  const updatedProfile = { ...req.session.user };

  for (let key in req.body) {
    if (req.body[key].trim().length > 0) {
      updatedProfile[key] = req.body[key];
    }
  }
  if (req.file) updatedProfile.image = req.file.path;

  try {
    const result = await User.updateProfile(
      req.session.user._id,
      updatedProfile
    );
    const newUser = await User.findById(req.session.user._id);
    await Tweet.updateTweetsUsers(newUser._id, newUser);
    await Notification.update(newUser._id, newUser);

    req.session.user = newUser;
    req.session.save((err) => {
      res.redirect("/profile/" + req.session.user._id);
    });
  } catch (err) {
    next(new Error("Server Error"));
  }
};
