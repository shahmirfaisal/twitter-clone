const getDb = require("../database/database").getDb;
const mongodb = require("mongodb");

module.exports = class Notification {
  constructor(text, user, tweetId, email) {
    this.text = text;
    this.user = user;
    this.tweetId = tweetId;
    this.email = email;
  }

  async save() {
    const db = getDb();

    try {
      const res = await db.collection("notifications").insertOne(this);
      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async fetchAll(email) {
    const db = getDb();
    try {
      const notifications = await db
        .collection("notifications")
        .find({ email })
        .toArray();

      return notifications;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(id, user) {
    const db = getDb();
    try {
      const res = await db.collection("notifications").updateMany(
        { "user._id": new mongodb.ObjectID(id) },
        {
          $set: {
            user,
          },
        }
      );
      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
