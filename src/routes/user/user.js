const express = require('express');
var mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USR,
    database: process.env.MYSQL_DATABASE
});

//View all users info
router.get('/', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let sql = "SELECT * FROM user";
            connection.query(sql, (err, result) => {
            if (err) {
                return;
            } else {
                res.send(result);
            }
        });
    });
});

//View All users tasks
router.get('/todos', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        var sql = "SELECT * FROM todo";
            connection.query(sql, (err, result) => {
            if (err) return;
            res.status(200).json(result);   
        });
    });
});

//View user info
router.get('/:id', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let id = req.params.id;
        let sql = `SELECT * FROM user WHERE id = ? OR email = ?`;
            connection.query(sql, [id, id], (err, result) => {
            if (err) return;
            res.status(200).json(result);   
        });
    });
});

//Update user info
router.put('/:id', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let email = req.body.email;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let name = req.body.name;
        let sql = `UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?`;
        connection.query(sql, [email, password, firstname, name, req.params.id], (err, result) => {
            if (err) return;
            res.status(200).json(result);
        });
    });
});

//Delete user
router.delete('/:id', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
        connection.query(sql, (err, result) => {
            if (err) return;
            res.status(200).json({ "msg": "succesfully deleted record number : ${id}" });
        });
    });
});

module.exports = router;