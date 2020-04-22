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
const errorController = require("./controllers/error");

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
    cb(null, "profileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/profileImages",
  express.static(path.join(__dirname, "profileImages"))
);
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

app.use(errorController.get404);

app.use(errorController.get500);

mongoConnect(() => {
  app.listen(3000);
});
