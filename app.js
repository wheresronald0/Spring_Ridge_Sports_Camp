var express = require("express");
var app = express();
var request = require("request");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/Spring_Ridge_Camp",
  { useNewUrlParser: true }
);

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); //use all the time cut paste
app.set("view engine", "ejs");

var campgroundSchema = mongoose.Schema({
  //will probably have seperate schema files with a lot of data
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("campground", campgroundSchema); //singular collection name for db that mondo make pural

//don't need this now that the POST route is tied into the db (can use for manual adds from this JS file though so I may need to uncomment this from time to time)
// Campground.create(
//   {
//     name: "Granite Hill",
//     image:
//       "https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2133a2e6648c39b6d1845bcc603b09ce&auto=format&fit=crop&w=1050&q=80",
//     description:
//       "This campground has amazing views of the Granite mountain range"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log("some whent wrong");
//     } else {
//       console.log("Success- you've added a campground");
//       console.log(campground);
//     }
//   }
// );

// var campgrounds = [ //use a global array only if i'm not connecting to a db
//   {
//     name: "Salmon Creek",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Granite Hill",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Mountain  Goat's Rest",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Salmon Creek",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Granite Hill",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Mountain  Goat's Rest",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Salmon Creek",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Granite Hill",
//     image: "https://via.placeholder.com/350x150"
//   },
//   {
//     name: "Mountain  Goat's Rest",
//     image: "https://via.placeholder.com/350x150"
//   }
// ];

app.get("/", function(req, res) {
  res.render("landing");
});

//this was the hard coded get route prior to the bd, accessing the array (see below for new dynamic db route)
// app.get("/campgrounds", function(req, res) {
//   res.render("campgrounds", { campgrounds: campgrounds });
// });
app.get("/campgrounds", function(req, res) {
  //get all campgrounds from db and then render them
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log("something when wrong");
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

//old post route tha twas pushing the add new capmground page into the array, but now we need it to update the database! See directly below
// app.post("/campgrounds", function(req, res) {
//   //get data from form and add to campgrounds array
//   var name = req.body.name;
//   var image = req.body.image;
//   var newCampground = { name: name, image: image };
//   campgrounds.push(newCampground);
//   //redirect back to campgroundspage
//   res.redirect("campgrounds");
// });
app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  //Creat a new campground and update the db
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgroundspage
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// //SHOW shows more info on a particular campground
app.get("/campgrounds/:id", function(req, res) {
  //find tghe campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    //new Mongo method findById executed on the mongo Model (the one capitalized like a Class that lets it inherit all the mongo methods)
    if (err) {
      console.log("error");
    } else {
      //render the show temp of that campground
      res.render("show", { campground: foundCampground }); //campground corresponds with the index ejs a-tag
    }
  });
});

app.listen(4000, function() {
  console.log("Camp fire is lit!!");
});
