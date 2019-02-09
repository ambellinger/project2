/* eslint-disable no-unused-vars */
var db = require("../models");
var request = require("request");
var _ = require("lodash");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //console.log("THIS IS OUR CHECK 1");
    db.Names.findAll({}).then(function(name) {
      //console.log("THIS IS OUR CHECK 2")
      //var orderedname1 = _.map(name);
      //var orderedname2 = _.sortedUniq(orderedname1);
      console.log("consoling logging" + name);
      var orderedname = _.uniq(name);
      //var orderedname = _.map(name);
      //console.log("testing .uniq" + orderedname);
      //console.log("testing 2" + orderedname2);
      res.render("index", {
        msg: "BURGER",
        name: orderedname
      });
    });
  });
  console.log(_.sortedUniq([1, 1, 2]));

  // Load example page and pass in an example by id
  app.get("/Names/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Names.findOne({ where: { id: req.params.id } }).then(function(name) {
      res.render("Names", {
        name: name
      });
    });
  });

  // app.get("/:name", function(req, res) {
  //   var apiKey = "ji598704009";
  //   var name = req.params.name;
  //   var url =
  //     "https://www.behindthename.com/api/lookup.json?name=" +
  //     name +
  //     "&key=" +
  //     apiKey;
  //   request(url, function(error, response, body) {
  //     // console.log("error: ", error);
  //     // console.log("status code: ", response);
  //     // console.log("body: ", body);
  //     var jsonData = JSON.parse(body);
  //     console.log(jsonData);
  //     console.log("Your Name is: ", jsonData[0].name);
  //     console.log("That gender is: ", jsonData[0].gender);
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
