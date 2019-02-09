var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/Names", function(req, res) {
    db.Names.findAll({}).then(function(names) {
      //Do I put the join here?
      res.json(names);
    });
  });

  // Create a new example
  app.post("/api/Names", function(req, res) {
    db.Names.create(req.body).then(function(dbNames) {
      res.json(dbNames);
    });
  });

  // Delete an example by id
  app.delete("/api/Names/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Names.destroy({ where: { id: req.params.id } }).then(function(dbNames) {
      res.json(dbNames);
    });
  });
};
