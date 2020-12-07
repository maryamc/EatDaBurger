$(function () {
    $.ajax("/api/burgers", {
        type: "GET"
    }).then(function (data) {
        var devoured = $("#devoured");
        var notDevoured = $("#notDevoured");

        var burgers = data.burgers;
        var len = burgers.length;

        for (var i = 0; i < len; i++) {
            var new_elem =
                "<li>" +
                burgers[i].id +
                ". " + burgers[i].burger_name +
                "<button class='devour' data-id='" +
                burgers[i].id +
                "' data-devouredBurger='" +
                !burgers[i].devoured +
                "'>";

            if (cats[i].devoured) {
                new_elem += "Devoured";
            } else {
                new_elem += "Not Devoured";
            }

            new_elem += "</button>";

            new_elem +=
                "<button class='delete-burger' data-id='" +
                burgers[i].id +
                "'>DELETE!</button></li>";

            if (cats[i].devoured) {
                devoured.append(new_elem);
            } else {
                notDevoured.append(new_elem);
            }
        }
    });

    $(document).on("click", ".devour", function (event) {
        var id = $(this).data("id");
        var devouredBurger = $(this).data("devouredBurger") === true;

        var newlyDevoured = {
            devour: devouredBurger
        };

        // Send the PUT request.
        $.ajax("/api/burgers" + id, {
            type: "PUT",
            data: JSON.stringify(newlyDevoured),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("burger devoured", devouredBurger);
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burgerName").val().trim(),

            devoured: $("#devoured").val().trim()

        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("new burger added");
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(document).on("click", ".delete-burger", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
        });
    });
});