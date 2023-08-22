var express = require("express");
var app = express();
require("./db/conn");
const router = require("../src/router/router");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

require("dotenv").config();
var port = process.env.PORT || 4000;

const sessions = require("express-session");
const oneDay = process.env.oneDay || 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

var path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

const axios = require("axios");

function callRoute() {
  axios
    .get(`http://${process.env.URL}/setIntervalRoute`)
    .then((response) => {
      console.log("HTTP request successful:", response.data);
    })
    .catch((error) => {
      console.error("Error making HTTP request:", error);
    });
}

const interval = setInterval(callRoute, 2500);

app.use("/", router);

app.listen(port);
