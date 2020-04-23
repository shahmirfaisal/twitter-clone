const MongoClient = require("mongodb").MongoClient;

let db;

exports.mongoConnect = async (cb) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db("twitter-clone");
    cb();
  } catch (err) {}
};

exports.getDb = () => db;
