var mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USR,
    database: process.env.MYSQL_DATABASE
});

module.exports.connection = connection;