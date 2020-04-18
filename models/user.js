const getDb = require("../database/database").getDb;
const mongodb = require("mongodb");

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

module.exports = class User {
  constructor(name, username, email, password) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.bio = "Unkown";
    this.country = "Unknown";
    this.website = "Unknown";
    this.joined =
      months[new Date().getMonth()] + " " + new Date().getFullYear();
    this.image = "images/profile-img.jpg";
  }

  async save() {
    const db = getDb();
    try {
      const res = await db.collection("users").insertOne(this);
      return res.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async findByUsername(username) {
    const db = getDb();
    try {
      const user = await db.collection("users").find({ username }).next();
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static async findByEmail(email) {
    const db = getDb();
    try {
      const user = await db.collection("users").find({ email }).next();
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    const db = getDb();
    try {
      const user = await db
        .collection("users")
        .find({ _id: new mongodb.ObjectID(id) })
        .next();
      return user;
    } catch (err) {
      console.log(err);
    }
  }
};
