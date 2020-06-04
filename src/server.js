// Declares the server through Express package
const express = require("express");
const server = express();


// Configure public directory
server.use(express.static("public"));


// Configure template engine Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});


// Configure paths to the application
server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.get("/search", (req, res) => {
    return res.render("search-results.html");
});


// Turns on the server
server.listen(3000);