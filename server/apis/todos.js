'use strict';

const mysql = require("mysql2");
const con = mysql.createConnection({
     host: 'db',
     user: 'root',
     password: 'root',
     database: 'Web',
     //port: '3308'
});


const express = require(`express`);
const todosApi = express.Router();


todosApi.get('/', async (req, res) => {
  var result = [];
  var object = {};
  con.query('SELECT * FROM todos', function(err, rows, fields) {
      if (err) throw err;
        rows.forEach(e => {
          if (e.isDone == 0) {
            e.isDone = false;
          } else {
            e.isDone = true;
          }
        });
        res.json(rows);
        // for (var i = 0; i < rows.length; i++) {
        //   let bool = rows[i].isDone;
        //   if (bool == 0) {
        //     bool = false;
        //   }else{
        //     bool = true;
        //   }
        //   object = {
        //     id: rows[i].id,
        //     label: rows[i].label,
        //     idList: rows[i].idList,
        //     isDone: bool
        //   }
        //   result.push(object);
        // };
        // return res.json(result);
      });
});


todosApi.post('/', function(req, res) {
  let sql = 'INSERT INTO todos(label, idList, isDone) VALUES (?,?,?)';
  let datas = [
    req.body.label,
    req.body.idList,
    false
  ];
  con.query(sql, datas, function(err, row) {
      if (err) throw err;
      res.json({
        id: row.insertId,
        label: req.body.label,
        idList: req.body.idList,
        isDone: false
      });      
  });
});

todosApi.put('/:id', function(req, res) {
  let sql = 'UPDATE todos SET label = ?, isDone = ? WHERE id = ? ';
  let datas = [
    req.body.label,
    req.body.isDone,
    req.params.id
  ];
  con.query(sql, datas, function(err, row) {
    if (err) throw err;
    res.json({
      id: req.body.id,
      label: req.body.label,
      idList: req.body.idList,
      isDone: req.body.isDone
    });

  });
});

todosApi.delete('/:id', function(req, res) {
  let id = req.params.id;
  con.query('DELETE FROM todos WHERE id = ?',[id], function(err, rows) {
      if (err) throw err;
      res.json(rows);
    });
});


module.exports = todosApi;
