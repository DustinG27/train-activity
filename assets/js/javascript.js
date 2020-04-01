$(document).ready(function(){

// initialize firebase
var config = {
    apiKey: "AIzaSyBEX0HuKIUxba4tNGh3EthP9E2RWPTlaFs",
    authDomain: "train-activity-a3002.firebaseapp.com",
    databaseURL: "https://train-activity-a3002.firebaseio.com",
    projectId: "train-activity-a3002",
    storageBucket: "train-activity-a3002.appspot.com",
    messagingSenderId: "369113712572",
    appId: "1:369113712572:web:d3dd317ddc0147d7928db9",
    measurementId: "G-K8PRLMWPQ1"
};

firebase.initializeApp(config);

var database = firebase.database();

// create an on click function
$("#run-search").on("click", function() {

    event.preventDefault();

// variables to hold user input

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = moment($("trainTime").val().trim(),"HH:mm").subtract(10,"years").format("X")
    var frequency = $("#frequency").val().trim();

// Creates local "temporary" object for holding employee data

    var newTrain = {
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    }
console.table(newTrain);
// Uploads employee data to the database
database.ref().push(newTrain);

// Clears all of the text-boxes
$("#name").val("");
$("#destination").val("");
$("#trainTime").val("");
$("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name); 

    // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = moment(childSnapshot.val().);
  var trainFrequency = childSnapshot.val().frequency;

   // Calculate the months worked using hardcore math
  // To calculate the months worked

  var remainder = moment().diff(moment(trainTime), "minutes");
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

   // Create the new row
   var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(arrival),
    $("<td>").text(minutes)
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);
});

});