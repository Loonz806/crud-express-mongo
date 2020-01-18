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
app.use(express.static("public"));
app.use(bodyParser.json());

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
  db.collection("quotes").save(req.body, err => {
    if (err) return console.log(err);

    console.log("saved to database");
    return res.redirect("/");
  });
});

app.put("/quotes", (req, res) => {
  db.collection("quotes").findOneAndUpdate(
    { name: "Yoda" },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/quotes", (req, res) => {
  // Handle delete event here
  db.collection("quotes").findOneAndDelete(
    { name: req.body.name },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({ message: "A darth vadar quote got deleted" });
    }
  );
});
