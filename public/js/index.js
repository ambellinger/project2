// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

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
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshNames = function() {
  API.getNames().then(function(data) {
    var $names = data.map(function(name) {
      var $a = $("<a>")
        .name(name.text)
        .attr("href", "/name/" + name.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": name.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $nameList.empty();
    $nameList.append($names);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// eslint-disable-next-line no-unused-vars
var handleFormSubmit = function(event) {
  event.preventDefault();

  var name = {
    name: $exampleText.val().trim()
  };

  if (!name.text) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveName(name).then(function() {
    refreshNames();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

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

var getName = function() {
  event.preventDefault();
  var apiKey = "ji598704009";
  var name = $exampleText.val().trim();
  var url =
    "https://www.behindthename.com/api/lookup.json?name=" +
    name +
    "&key=" +
    apiKey;
  $.ajax({
    url: url,
    type: "GET",
    success: function(response) {
      console.log(response);

      $.ajax({
        url: "/api/Names",
        type: "POST",
        data: { name: response[0].name, gender: response[0].gender },
        success: function(response) {
          // console.log(response);
        }
      });
    }
  });
};

// var postName = function() {
//   event.preventDefault();
//   var apiKey = "ji598704009";
//   var name = $exampleText.val().trim();
//   var url =
//     "https://www.behindthename.com/api/lookup.json?name=" +
//     name +
//     "&key=" +
//     apiKey;
//   $.ajax({
//     url: "/api/Names",
//     type: "POST",
//     data: {name: "Test", gender:"f"}
//     success: function(response) {
//       // console.log(response);
//     }
//   });
// };

var randomMName = function() {
  var apiKey = "ji598704009";
  var url =
    "https://www.behindthename.com/api/random.json?usage=ita&gender=m&key=" +
    apiKey;
  $.ajax({
    url: url,
    type: "GET",
    success: function(response) {
      console.log(response.names[0]);
    }
  });
};

var randomFName = function() {
  var apiKey = "ji598704009";
  var url =
    "https://www.behindthename.com/api/random.json?usage=ita&gender=f&key=" +
    apiKey;
  $.ajax({
    url: url,
    type: "GET",
    success: function(response) {
      console.log(response.names[0]);
    }
  });
};

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
window.onload = randomMName();
window.onload = randomFName();
$submitBtn.on("click", getName);
// $submitBtn.on("click", getRelated);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
