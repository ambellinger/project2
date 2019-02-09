/* eslint-disable no-unused-vars */
var db = require("../models");
var request = require("request");
var _ = require("lodash");

module.exports = function(app) {
  // Loads home (root) page
  //using get request at root level gets table information because of the '/'
  app.get("/", function(req, res) {
    db.Names.findAll({}).then(function(dbNames) {
      console.log(dbNames);
      //render is only a handlebars keyword
      res.render("index", {

        msg: "Namesake",
        name: dbNames

      });
    });
  });

  app.get("/list", function(req, res) {
    db.Names.findAll({ list: true }).then(function(dbNames) {
      console.log(dbNames);
      //render is only a handlebars keyword
      res.render("index", {
        msg: "Your List",
        //records from the table 'Names' when queried, returned as json
        names: dbNames
      });
    });
  });



  //console.log(_.sortedUniq([1, 1, 2]));

  // Load example page and pass in an example by id
  // app.get("/name/:id", function(req, res) {
  //   // eslint-disable-next-line prettier/prettier
  //   db.Names.findOne({ where: { id: req.params.id } }).then(function(dbName) {
  //     res.render("name", {
  //       Names: dbName
  //     });
  //   });
  // });
  app.get("/name/:id", function(req, res) {
    db.Origins.findAll({
      where: {
        NameId: parseInt(req.params.id)
      }
    }).then(function(data) {
      res.render("name", {
        origins: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
