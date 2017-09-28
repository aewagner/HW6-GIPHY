var characters = ["Archer", "Rick Sanchez", "Morty", "BoJack Horseman", "Bob Belcher", "Finn the Human", "Jake the Dog", "Fry", "Bender", "Hank Hill"];

function renderButtons() {

    // Deleting the characters prior to adding new characters
    // (this is necessary otherwise you will have repeat buttons)
    $("#toon-buttons").empty();

    // Looping through the array of characters
    for (var i = 0; i < characters.length; i++) {

        // Then dynamicaly generating buttons for each character in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of toon to our button
        a.addClass("toon");
        // Adding a data-toon
        a.attr("data-toon", characters[i]);
        // Providing the initial button text
        a.text(characters[i]);
        // Adding the button to the toon-buttons div
        $("#toon-buttons").append(a);
    }
};





//$("button").on("click", function() {

function addGiphys() {
    // Grabbing and storing the data-toon property value from the button
    var toon = $(this).attr("data-toon");

    // Constructing a queryURL using the toon name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        toon + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var toonDiv = $('<div id="giph-container">');

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var toonImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                toonImage.attr("src", results[i].images.fixed_height_still.url);
                toonImage.attr("data-state", "still");
                toonImage.attr("data-still", results[i].images.fixed_height_still.url);
                toonImage.attr("data-animate", results[i].images.fixed_height.url);
                toonImage.addClass("gif")

                // Appending the paragraph and image tag to the animalDiv
                toonDiv.append(p);
                toonDiv.append(toonImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#toons").prepend(toonDiv);


            }
        });
};

$("#add-toon").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var character = $("#toon-input").val().trim();

    // Adding movie from the textbox to our array
    characters.push(character);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});




$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
    // alert(this);
});



// Adding a click event listener to all elements with a class of "toon"
$(document).on("click", ".toon", addGiphys);


renderButtons();