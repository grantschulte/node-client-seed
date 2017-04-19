const express = require("express");
const path    = require('path');
const utils   = require("./utils/utils");
const port    = process.env.PORT || 4000;
let app       = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
  utils.bootLog(port, app.get("env"));
});
