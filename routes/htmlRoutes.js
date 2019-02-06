/* eslint-disable no-unused-vars */
var db = require("../models");
var request = require("request");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Name.findAll({}).then(function(dbNames) {
      res.render("index", {
        msg: "Welcome!",
        names: dbNames
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/name/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Name.findOne({ where: { id: req.params.id } }).then(function(dbName) {
      res.render("name", {
        name: dbName
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
