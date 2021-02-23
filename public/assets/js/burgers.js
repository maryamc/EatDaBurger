$(function () {
    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        var eaten = $("#devoured");
        var notEaten = $("#notDevoured");
        var burgers = data.burgers;
        var len = burgers.length;
        for (var i = 0; i < len; i++) {
            var new_elem =
                "<li>" +
                burgers[i].id +
                ". " + burgers[i].burger_name +
                " <button class='btn btn-success devour' data-id='" +
                burgers[i].id +
                "' data-devouredburger='" +
                !burgers[i].devoured +
                "'> ";

            if (!burgers[i].devoured) {
                new_elem += "Eat It!";
            } else {
                new_elem += "One more?";
            }

            new_elem += "</button>";

            new_elem +=
                " <button class='btn btn-danger delete' data-id='" +
                burgers[i].id +
                "'> Delete It!</button></li>";

            if (burgers[i].devoured) {
                eaten.append(new_elem);
            } else {
                notEaten.append(new_elem);
            }
        }
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = { burger_name: $("#burgerName").val().trim() }


        // Send the POST request.
        $.ajax("/burgers", {
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

    $(document).on("click", ".devour", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var devouredBurger = $(this).data("devouredburger")

        var devouredBurgerState = {
            devoured: devouredBurger
        };

        // Send the PUT request.
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(devouredBurgerState),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("burger devoured", devouredBurgerState);
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(document).on("click", ".delete", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/burgers/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
        });
    });
});