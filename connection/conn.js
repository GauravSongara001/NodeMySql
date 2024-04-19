var mysql = require('mysql');

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college",
})

module.exports = conn;