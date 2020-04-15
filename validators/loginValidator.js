const { body } = require("express-validator/check");
const User = require("../models/user");

module.exports = [
  body("username_email", "Please enter your username or email!")
    .trim()
    .isLength({ min: 1 })
    .custom(async (value, { req }) => {
      const user = await User.findByUsername(value);
      if (user) {
        return Promise.resolve();
      } else {
        const user = await User.findByEmail(value);
        return user
          ? Promise.resolve()
          : Promise.reject("Username or email is wrong!");
      }
    }),

  body("password", "Length of the password should be between 6 and 32!")
    .isLength({
      min: 6,
      max: 32,
    })
    .custom(async (value, { req }) => {
      const user = await User.findByUsername(req.body.username_email);

      if (user && user.password === value) {
        return Promise.resolve();
      } else {
        const user = await User.findByEmail(req.body.username_email);
        if (user && user.password === value) {
          return Promise.resolve();
        } else {
          return Promise.reject("Password is wrong!");
        }
      }
    }),
];
