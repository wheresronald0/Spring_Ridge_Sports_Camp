var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); //use all the time cut paste
app.set("view engine", "ejs");

var campgrounds = [
  {
    name: "Salmon Creek",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Granite Hill",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Mountain  Goat's Rest",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Salmon Creek",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Granite Hill",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Mountain  Goat's Rest",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Salmon Creek",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Granite Hill",
    image: "https://via.placeholder.com/350x150"
  },
  {
    name: "Mountain  Goat's Rest",
    image: "https://via.placeholder.com/350x150"
  }
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  //redirect back to campgroundspage
  res.redirect("campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(4000, function() {
  console.log("Camp fire is lit!!");
});
