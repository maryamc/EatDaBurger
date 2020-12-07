// Dependencies
var express = require("express");

// setting up express app
var app = express();
var PORT = process.env.PORT || 8080;

// setting up the express app to handle the data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// adding server listener
app.listen(PORT, function(){
    console.log ("Server listening on: http://localhost:" + PORT);
});
