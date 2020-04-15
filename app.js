const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./database/database").mongoConnect;
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const MongoSession = require("connect-mongodb-session")(session);
const userRouter = require("./routes/user");
const tweetRouter = require("./routes/tweet");
const notificationRouter = require("./routes/notification");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const sessionStore = new MongoSession({
  collection: "sessions",
  uri:
    "mongodb+srv://shahmir:programmingchola@cluster0-3jbwc.mongodb.net/twitter-clone?retryWrites=true&w=majority",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ storage }).single("image"));
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(userRouter);
app.use(tweetRouter);
app.use(notificationRouter);

mongoConnect(() => {
  app.listen(3000);
});
