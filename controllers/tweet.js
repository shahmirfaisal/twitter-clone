exports.getHome = (req, res, next) => {
  if (!req.session.isLogin) return res.redirect("/signup");

  res.render("home", {
    pageTitle: "Twitter",
    path: "/",
  });
};
