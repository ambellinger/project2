// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $listBtn = $(".list");
var $nameList = $("#example-list");
var $deleteBtn = $(".delete");

// The API object contains methods for each kind of request we'll make
var API = {
  saveName: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/names",
      data: JSON.stringify(example)
    });
  },
  //Example is the object created in the saveOrigin function, containing the name ID from the table and the information from the external API request
  saveOrigin: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/origins",
      data: JSON.stringify(example)
    });
  },
  getNames: function() {
    return $.ajax({
      url: "api/names",
      type: "GET"
    });
  },
  deleteName: function(id) {
    return $.ajax({
      url: "api/names/" + id,
      type: "DELETE"
    });
  },

  updateName: function(id) {
    return $.ajax({
      url: "api/list/" + id,
      type: "PUT"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshNames = function() {
  API.getNames().then(function(data) {
    var $names = data.map(function(name) {
      var $a = $("<a>")
        .text(name.name)
        .attr("href", "/name/" + name.id);

      var $li = $("<li>").attr({
        class: "list-group-item",
        "data-id": name.id
      });

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      var $addlistbutton = $("<button>")
        .text("Add To Your List")
        .addClass("list")
        .addClass("btn float-right");

      $li.append($a, $button, $addlistbutton);

      return $li;
    });

    $nameList.empty();
    $nameList.append($names);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  //$exampleText is the input search text, taken as a string and added to the API call URL
  getName($exampleText.val().trim());
};

//DELETE BUTTON//
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteName(idToDelete).then(function() {
    refreshNames();
  });
};

//LIST BUTTON//
//handleListBtnClick is called when add to list button is clicked
//Update the record from the db and refresh the list

var handleListBtnClick = function() {
  var idToUpdate = $(this)
    .parent()
    .attr("data-id");

  API.updateName(idToUpdate).then(function() {
    console.log("updating name...");
    //Keeping code for the future development to delete the name from the front page withoout deleting it
    //from the database
    //refreshNames();
  });
  console.log("button clicked");
};

var getName = function(name) {
  event.preventDefault();

  $.ajax({
    url: "api/behindnames/" + name,
    type: "GET",
    success: function(data) {
      console.log("behind names: " + data[0].name);

      var name = {
        // PROPERTIES & METHODS ONLY
        name: data[0].name,
        gender: data[0].gender
      };
      //getting data from API, after creating an object, to store on client side in order to use server side
      //server side creates record in MySQL
      API.saveName(name).then(function(response) {
        //response is the data returned
        refreshNames();
        console.log("nameid:" + response.id);
        //response.id is the ID from the name table, taken from save name
        //data is the external API result
        var origin = {
          usages: data,
          nameid: response.id
        };

        console.log(origin.usages[0].usages[0].usage_full);
        console.log(origin.usages[0].usages[0].usage_gender);
        API.saveOrigin(origin).then(function(response) {});
      });
      $exampleText.val("");
    }
  });
};

//CODE BELOW IS KEPT FOR FUTURE DEVELOPMENT//
// var randomMName = function() {
//   var apiKey = "ji598704009";
//   var url =
//     "https://www.behindthename.com/api/random.json?usage=ita&gender=m&key=" +
//     apiKey;
//   $.ajax({
//     url: url,
//     type: "GET",
//     success: function(response) {
//       console.log(response.names[0]);
//     }
//   });
// };

// var randomFName = function() {
//   var apiKey = "ji598704009";
//   var url =
//     "https://www.behindthename.com/api/random.json?usage=ita&gender=f&key=" +
//     apiKey;
//   $.ajax({
//     url: url,
//     type: "GET",
//     success: function(response) {
//       console.log(response.names[0]);
//     }
//   });
// };

// var getRelated = function() {
//   event.preventDefault();
//   var apiKey = "ji598704009";
//   var name = $exampleText.val().trim();
//   var url =
//     "https://www.behindthename.com/api/related.json?name=" +
//     name +
//     "&usage=eng&key=" +
//     apiKey;
//   $.ajax({
//     url: url,
//     type: "GET",
//     success: function(response) {
//       console.log(response);
//     }
//   });
// };

// Add event listeners to the submit and delete buttons
// window.onload = randomMName();
// window.onload = randomFName();
$submitBtn.on("click", handleFormSubmit);
$nameList.on("click", ".list", handleListBtnClick);
// $submitBtn.on("click", handleFormSubmit);
// $submitBtn.on("click", getRelated);
$nameList.on("click", ".delete", handleDeleteBtnClick);
