/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { username, password, port } = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let db;
const url = `mongodb://${username}:${password}@ds263448.mlab.com:63448/quotes`;

// Remember to change YOUR_USERNAME and YOUR_PASSWORD to your username and password!
MongoClient.connect(url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db("quotes");
  return app.listen(port || 3000, () => {
    console.log(`listening on ${port}`);
  });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  db.collection("quotes")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      return res.render("index.ejs", { quotes: result });
    });
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("saved to database");
    return res.redirect("/");
  });
});

app.put("/quotes", (req, res) => {
  // handle put request
});
