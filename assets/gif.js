
var gifs = ["Avengers", "The Dark Knight", "Guardians of the Galaxy", "Spider-Man","Batman Begins","X-men", "The Dark Knight Rises", "Iron Man","Superman","Thor"];

function displaysearchInfo() { 
    $("#gifs-appear-here").empty();
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=%22" + search + "%22&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ 
        url: queryURL,
        method: "GET"
        }).done(function (response) {
            console.log(response);
            var searchDiv = $("<div class='search'>");
            var results = response.data;
            for (var i = 0; i < results.length; i++) { 
                var p = $("<p>").text("Rating: " + results[i].rating);
                searchDiv.append(p); //displays the rating;
                var imgURL = results[i].images.fixed_height.url;
                var image = $("<img>").attr("src", imgURL);
                console.log(image);
                image.attr("data-state", "still");
                image.attr("data-still", results[i].images.fixed_height.url);
                image.attr("data-animate", results[i].images.fixed_height_still.url);
                image.addClass("gif_img col md-5");
                searchDiv.append(image); 
                $("#gifs-appear-here").prepend(searchDiv); 
            }
            $(".gif_img").on("click", function () {
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
                }
              });

        })
 
};

function renderbButtons() {
    $("#buttons-view").empty();
    for (var i =0; i < gifs.length; i++) { 
        var a = $("<button>"); 
        a.addClass("gif");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a) + "<br>";
    } 
    }
    $("#search-movie").on("click", function (event) { 
        event.preventDefault();
        var search = $("#search-input").val().trim();
        if (search !=='') { 
            $("#search-input").val('');
            gifs.push(search);
            renderbButtons();
              }
    });
    $(document).on("click", ".gif", displaysearchInfo);
  //  console.log(displaysearchInfo);
    renderbButtons();






