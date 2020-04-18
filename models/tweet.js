const getDb = require("../database/database").getDb;
const mongodb = require("mongodb");

module.exports = class Tweet {
  constructor(tweet, user) {
    this.tweet = tweet;
    this.user = user;
    this.likes = [];
    this.comments = [];

    // Structure of Comment
    // this.comments = [
    //   {
    //     user: {},
    //     comment: "",
    //   },
    // ];
  }

  async save() {
    const db = getDb();
    try {
      const res = await db.collection("tweets").insertOne(this);
      return res.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchAll() {
    const db = getDb();
    try {
      const tweets = await db.collection("tweets").find().toArray();
      return tweets;
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchByUserId(userId) {
    const db = getDb();
    try {
      const tweets = await db
        .collection("tweets")
        .find({ "user._id": new mongodb.ObjectID(userId) })
        .toArray();
      console.log("Tweets", tweets);
      return tweets;
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchById(id) {
    const db = getDb();
    try {
      const tweet = await db
        .collection("tweets")
        .find({ _id: new mongodb.ObjectID(id) })
        .next();
      return tweet;
    } catch (err) {
      console.log(err);
    }
  }

  static async toggleLike(id, likes) {
    const db = getDb();
    try {
      const res = await db
        .collection("tweets")
        .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { likes } });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async addComment(id, comments) {
    const db = getDb();
    try {
      const res = await db
        .collection("tweets")
        .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { comments } });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
};
