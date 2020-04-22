const Notification = require("../models/notification");

exports.getNotifications = async (req, res, next) => {
  const { user, isLogin } = req.session;

  if (!isLogin) return res.redirect("/signup");

  try {
    const notifications = await Notification.fetchAll(user.email);

    res.render("notifications", {
      pageTitle: "Notifications - Twitter",
      path: "/notifications",
      currentUser: user,
      notifications,
    });
  } catch (err) {
    next(new Error("Server Error"));
  }
};
