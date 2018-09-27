var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  console.log("workin!");
});

app.listen(4000, function() {
  console.log("Camp fire is lit!!");
});
