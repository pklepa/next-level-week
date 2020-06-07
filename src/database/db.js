// Import sqlite3 package
const sqlite3 = require("sqlite3").verbose();

// Create object to make alterations in the database
const db = new sqlite3.Database("./src/database/database.db");



module.exports = db;


db.serialize(() => {
    // // Creates a db table
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `);

    // // Inserts data into table
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `;
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
    //     "Papersider",
    //     "Gilherme Gemballa, Jardim America",
    //     "Numero 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papeis e Papelao"
    // ];

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Cadastrado com sucesso");
    //     console.log(this);
    // }

    // db.run(query, values, afterInsertData);



    // // Consult data from the table
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('aqui estao seus registros:');
    //     console.log(rows);
    // });


    // Deletes data from table
    // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso.");
    // });

});