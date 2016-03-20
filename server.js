var express = require("express");
var http = require("http");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "public")));

http.createServer(app).listen(8080, function () {

    console.log("Express server listening on port 8080");

});