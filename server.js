const express = require("express");

const app = express();
const port = 3000;
// listen event to work with if the node app is on..
app.listen(port, function listen() {
  console.log(`listening on port:${port}`);
});

app.get("/", () => {
  console.log("hello lenny!");
});
