// Declares the server through Express package
const express = require("express");
const server = express();


// Fetches database
const db = require("./database/db.js");


// Configures public directory
server.use(express.static("public"));


// Enables usage of req.body in the application
server.use(express.urlencoded({ extended: true }));


// Configures template engine Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});


// Configure paths to the application
// - Homepage
server.get("/", (req, res) => {
    return res.render("index.html");
});


// - Create-point page
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

// - Create-point page POST
server.post("/save-point", (req, res) => {

    // Inserts data into table
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send('Erro no cadastro :(')
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData);

});


// - Search-results page 
server.get("/search", (req, res) => {
    const search = req.query.search;

    if(search == "") {
        // Renders an empty result
        return res.render("search-results.html", { total: 0 });
    }

    // Fetches data from the table
    // db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length;

        console.log('Aqui estao seus registros:');
        console.log(rows);

        return res.render("search-results.html", { places: rows, total: total });
    });
});


// Turns on the server
server.listen(3000);