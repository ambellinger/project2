var db = require("../models");

var axios = require("axios");

var keys = require("../keys");

module.exports = function (app) {
  // Get all examples
  app.get("/api/behindnames/:name", function (req, res) {
    //this search is off of query parameters on URL path, using the name input box & search value
    var search = req.params.name;
    //APIKey is your actual key, hidden in the .env
    var APIKey = keys.KEY;
    axios.get(`https://www.behindthename.com/api/lookup.json?name=${search}&key=${APIKey}`).then(
      function (response) {
        res.json(response.data)
      }
    );
  });
  //this call gets all of the names from the Names table
  app.get("/api/names", function (req, res) {
    db.Names.findAll({}).then(function (dbNames) {
      res.json(dbNames);
    })
  })

  // Creates a new example
  app.post("/api/names", function (req, res) {
    db.Names.create(req.body).then(function (dbNames) {
      //this is the same as the data passed through from the refreshNames function, but as a callback function it must be included
      //used specifically for client refresh in public.js
      res.json(dbNames);
    });
  });
  //req.body from the middleware which has been translated into json, using the .usage operator to find the many results if a name has them.
  app.post("/api/origins", function (req, res) {

    for (var i = 0; i < req.body.usages[0].usages.length; i++) {

      db.Origins.create({
        origin: req.body.usages[0].usages[i].usage_full,
        origingender: req.body.usages[0].usages[i].usage_gender,
        //this is the foreign key that links them together, from response.id - which is NameId
        //this inserts the NameID and origin elements into the table
        NameId: req.body.nameid
      }).then(task => {

      });

    }
  })

  //DELETE BUTTON STUFF//
  // Delete an example by id
  app.delete("/api/names/:id", function (req, res) {
    db.Names.destroy({ 
      where:  {
        id: req.params.id 
      }
    }).then(function (dbNames) {
      res.json(dbNames);
      console.log("name deleted");
    });
  });


//LIST BUTTON STUFF//
app.put("/api/list/:id", function (req, res) {
  db.Names.update({
    list: 1
  }, {
    where: {
      id: req.params.id 
    }
  }).then(function(dbTodo) {
    res.json(dbTodo);
  });
});

};

