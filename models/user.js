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
    this.image =
      "https://res.cloudinary.com/dw3ap99ie/image/upload/v1590679237/1589133680691-profile-img_bgii9i.jpg";
  }

  async save() {
    const db = getDb();
    try {
      const res = await db.collection("users").insertOne(this);
      return res.ops[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findByUsername(username) {
    const db = getDb();
    try {
      const user = await db.collection("users").find({ username }).next();
      return user;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findByEmail(email) {
    const db = getDb();
    try {
      const user = await db.collection("users").find({ email }).next();
      return user;
    } catch (err) {
      return Promise.reject(err);
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
      return Promise.reject(err);
    }
  }

  static async updateProfile(id, profile) {
    const db = getDb();
    try {
      const res = await db
        .collection("users")
        .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: profile });
      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
