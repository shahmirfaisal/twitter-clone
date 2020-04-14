const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./database/database").mongoConnect;
const multer = require("multer");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

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

mongoConnect(() => {
  app.listen(3000);
});
