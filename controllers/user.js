const { validationResult } = require("express-validator/check");
const User = require("../models/user");

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
  console.log(errors.array());

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

  const user = new User(name, username, email, password);
  const newUser = await user.save();
  req.session.user = newUser;
  req.session.isLogin = true;
  req.session.save((err) => {
    res.redirect("/");
  });
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
};

exports.postLogout = (req, res, next) => {
  req.session.user = null;
  req.session.isLogin = false;
  req.session.save((err) => {
    res.redirect("/signup");
  });
};
