exports.getHome = (req, res, next) => {
  res.render("home", {
    pageTitle: "Twitter",
    path: "/",
  });
};
