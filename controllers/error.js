exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found! - Twitter",
  });
};

exports.get500 = (error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Server Error - Twitter",
  });
};
