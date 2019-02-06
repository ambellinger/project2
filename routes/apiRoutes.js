var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/names", function(req, res) {
    db.Name.findAll({}).then(function(dbNames) {
      res.json(dbNames);
    });
  });

  // Create a new example
  app.post("/api/names", function(req, res) {
    db.Name.create(req.body).then(function(dbName) {
      res.json(dbName);
    });
  });

  // Delete an example by id
  app.delete("/api/names/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Name.destroy({ where: { id: req.params.id } }).then(function(dbName) {
      res.json(dbName);
    });
  });
};
