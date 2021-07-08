const express = require('express');
var mysql = require('mysql2');

const router = express.Router();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USR,
    database: process.env.MYSQL_DATABASE
});

//View all Todos
router.get('/', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        var sql = "SELECT * FROM todo";
            connection.query(sql, (err, result) => {
            if (err) {
                return;
            } else {
                res.send(result);
            }
        });
      });
});

//View a Todo
router.get('/:id', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let id = req.params.id;
        let sql = `SELECT * FROM todo WHERE id = ?`;
            connection.query(sql, [id], (err, result) => {
            if (err) {
                return;
            } else {
                res.send(result);
            }
        });
      });
});

//Create a todo
router.post('/', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let sql = "INSERT INTO todo (title, description, due_time, user_id, status) VALUES ?";
        let values = [[req.body.title, req.body.description, req.body.due_time, req.body.user_id, req.body.status]];
        connection.query(sql, [values], (err, result) => { 
            if (err) return;
            res.status(200).json(result);   
        });
    });
});

//Update a todo
router.put('/:id', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let title = req.body.title;
        let description = req.body.description;
        let due_time = req.body.due_time;
        let user_id = req.body.user_id;
        let status = req.body.status;
        let sql = `UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`;
        connection.query(sql, [title, description, due_time, user_id, status, req.params.id], (err, result) => {
            if (err) return;
            res.status(200).json(result);
        });
    });
});

//delete a todo
router.delete('/:id', (req, res) => {
    connection.connect(function(err) {
        if (err) return;
        let sql = `DELETE FROM todo WHERE id = ${req.params.id}`;
        connection.query(sql, (err, result) => {
            if (err) return;
                res.status(200).json({ "msg": "succesfully deleted record number : ${id}" })
        });
    });
});

module.exports = router