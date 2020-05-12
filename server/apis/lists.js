'use strict';

const mysql = require("mysql2");
const con = mysql.createConnection({
     host: 'db',
     user: 'root',
     password: 'root',
     database: 'Web',
});


const express = require(`express`);
const listsApi = express.Router();

listsApi.get(`/`, async (req, res) => {
    con.query('SELECT * FROM lists', function(err, rows) {
        if (err) throw err;
          res.json(rows);
        });
});


listsApi.post('/', function(req, res) {
    let sql = 'INSERT INTO lists(label, description) VALUES (?,?)';
    let datas = [
        req.body.label,
        req.body.description
    ];
    con.query(sql, datas, function(err, row, fields) {
        if (err) throw err;
        res.json({
            id: row.insertId,
            label: req.body.label,
            description: req.body.description
        });
});
});

listsApi.put('/:id', function(req, res) {
    let sql = 'UPDATE lists SET label = ?, description = ? WHERE id = ? ';
    let datas = [
        req.body.label,
        req.body.description,
        req.params.id
    ];
    con.query(sql, datas, function(err, row, fields) {
        if (err) throw err;
        return res.json({
            id: req.body.id,
            label: req.body.label,
            description: req.body.description
        });
    });
});



module.exports = listsApi;
