// Dependencies
var express = require("express");

// setting up express app
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static("public"));


// setting up the express app to handle the data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connecting routes to server
var routes = require("./controllers/burger_controllers");
app.use(routes);

// adding server listener
app.listen(PORT, function(){
    console.log ("Server listening on: http://localhost:" + PORT);
});
