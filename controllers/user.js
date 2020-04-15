exports.getSignup = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Sign up for Twitter",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Log in on Twitter",
  });
};
