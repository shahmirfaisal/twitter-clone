const { body } = require("express-validator");
const User = require("../models/user");

module.exports = [
  body("name", "Please enter your name!").trim().isLength({ min: 1 }),

  body("username", "Please enter your username!")
    .trim()
    .isLength({ min: 1 })
    .custom(async (value, { req }) => {
      const user = await User.findByUsername(value);
      return user
        ? Promise.reject("This username is already in use!")
        : Promise.resolve();
    }),

  body("email", "Please enter a valid email!")
    .trim()
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await User.findByEmail(value);
      return user
        ? Promise.reject("This email is already in use!")
        : Promise.resolve();
    }),

  body(
    "password",
    "Length of the password should be between 6 and 32!"
  ).isLength({
    min: 6,
    max: 32,
  }),
];
