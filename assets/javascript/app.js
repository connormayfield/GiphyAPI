
var topics = ["Dave Chappelle", "Norm Macdonald", "Eddie Murphy", "John Mulaney", "Gary Shandling", "Ricky Gervais", "Rodney Dangerfield", "Will Ferrell"];

function makeButtons() {

  $(".btn-grp").empty();

  for (var i = 0; i < topics.length; i++) {
      var comedian = $("<button/>");
      comedian.addClass("comedianButton");
      comedian.attr("data-name", topics[i]);
      comedian.text(topics[i]);

      $(".btn-grp").append(comedian);
  }
}
makeButtons();


$("#add-comedian").on("click", function (event) {
  event.preventDefault();

  var com = $("#comedian-input").val().trim();
  topics.push(com);

  makeButtons();
});


function displayGifs(com) {



  $("#gif-display").empty();


  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=U4aRR2AJCTMiJ6zRbmLbQWpE6HVRXx3z&limit=10&q=" + com;

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
          var gifDiv = $("<div>");

          var gif = $("<img>");
          gif.addClass('gif');
          gif.attr('src', response.data[i].images.fixed_height_still.url);
          gif.attr('data-still', response.data[i].images.fixed_height_still.url);
          gif.attr('data-animate', response.data[i].images.fixed_height.url);
          gif.attr('data-state', "still");

          gifDiv.append(gif);

          var rating = response.data[i].rating;
          var ratingDiv = $("<p class='rating'>").text("Rating: " + rating);

          gifDiv.append(ratingDiv);

          $("#gif-display").prepend(gifDiv);
      }
  })
};


$(document).on("click", ".comedianButton", function () {
  var com = $(this).attr("data-name");
  displayGifs(com);
});


$("#gif-display").on("click", ".gif", function () {

  var state = $(this).attr("data-state");

  if (state === "still") {
      var animate = $(this).attr("data-animate");
      $(this).attr("src", animate).attr("data-state", "animate");
  } else if (state === "animate") {
      var still = $(this).attr("data-still");
      $(this).attr("src", still).attr("data-state", "still");
  }
});
