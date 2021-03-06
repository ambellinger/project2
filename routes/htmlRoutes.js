var db = require("../models");
var request = require("request");

module.exports = function(app) {
  // Loads home (root) page
  //using get request at root level gets table information because of the '/'
  app.get("/", function(req, res) {
    db.Names.findAll({}).then(function(dbNames) {
      //render utilizes handlebars to print onto the page.
      res.render("index", {
        msg: "Namesake",
        names: dbNames
      });
    });
  });

  // Load example page and pass in an example by id
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

  //LIST STUFF//
  app.get("/list/", function(req, res) {
    db.Names.findAll({}).then(function(dbNames) {
      res.render("list", {
        msg: "Your List",
        names: dbNames
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
