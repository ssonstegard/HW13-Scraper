// Grabs article with json
$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.lentgh; i++) {

        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// On click for p tag to input notes
$(document).on("click", "p", function () {
    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    // Ajax call to grab article and allow you to input notes
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function (data) {
            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");

            $("#notes").append("<input id='titleinput' name='title'>");

            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

            $("#notes").append("<button data-id='" + data._id + "'id='savenote'>Save Note</button>");

            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});


// On Click to save notes to article
$(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");

    // Post to save notes
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#notes").empty();
        });

    // clears text inputs
    $("#titleinput").val("");
    $("#bodyinput").val("");
});