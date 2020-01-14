const express = require("express");

const app = express();
const port = 3000;
// listen event to work with if the node app is on..
app.listen(port, function listen() {
  console.log(`listening on port:${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});
