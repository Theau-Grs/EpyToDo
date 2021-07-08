const express = require('express');
var mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USR,
    database: process.env.MYSQL_DATABASE
});

//Register
router.post('/register', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let sql = "INSERT INTO user (email, name, firstname, password) VALUES ?";
        let values = [[req.body.email, req.body.name, req.body.firstname, req.body.password]];
        connection.query(sql, [values], (err, result) => { 
            if (err) {
                res.status(500).json({ "msg": "account already exists" });
            } else {
                res.status(200).json({ "token": 'Token of the newly registered user' });   
            }
            return;
        });
    });
});

//Login
router.post('/login', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let email = req.body.email;
        let password = req.body.password;
        let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
        connection.query(sql, [email, password], (err, result) => { 
            if (err || result.length == 0) {
                res.status(401).json({ "msg": "Invalid Credentials" });
            } else {
                res.status(200).json({ " token ": 'Token of the newly logged in user' });
            }
            return;
        });
    });
});

module.exports = router