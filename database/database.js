const MongoClient = require("mongodb").MongoClient;

let db;

exports.mongoConnect = async (cb) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://shahmir:programmingchola@cluster0-3jbwc.mongodb.net/twitter-clone?retryWrites=true&w=majority"
    );
    db = client.db("twitter-clone");
    cb();
  } catch (err) {}
};

exports.getDb = () => db;
