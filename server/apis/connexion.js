const mysql = require("mysql2");
const bdd = mysql.createConnection({
     host: 'db',
     user: 'root',
     password: 'root',
     database: 'Web',
});

module.exports.bdd = bdd