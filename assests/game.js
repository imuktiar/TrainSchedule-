
src="https://www.gstatic.com/firebasejs/5.8.1/firebase.js"

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCenuE9TtkaZb2_x_1r0Cp3T9Flxs1Qp9o",
    authDomain: "time-6b1dc.firebaseapp.com",
    databaseURL: "https://time-6b1dc.firebaseio.com",
    projectId: "time-6b1dc",
    storageBucket: "time-6b1dc.appspot.com",
    messagingSenderId: "677410351241"
  };
  firebase.initializeApp(config);

  $(document).ready(function() {
    
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

   // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq
    };

    // Uploads train data to the database
        database.ref().push(newTrain);


     // Alert
        alert("Train successfully added");

//clear all of the text boxes   
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;


     // Declare variable
        var trainFreq;

        // Time is to be entered on the entry form
          var firstTime = 0;

     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

    // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % trainFreq;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = trainFreq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
     "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });

});
