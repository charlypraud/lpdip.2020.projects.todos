'use strict';

const con = require ('./connexion');
const express = require(`express`);
const todosApi = express.Router();


todosApi.get('/', async (req, res) => {
  con.bdd.query('SELECT * FROM todos', function(err, rows) {
      if (err) throw err;
        rows.forEach(e => {
          if (e.isDone == 0) {
            e.isDone = false;
          } else {
            e.isDone = true;
          }
        });
        res.json(rows);
      });
});


todosApi.post('/', function(req, res) {
  let sql = 'INSERT INTO todos(label, idList) VALUES (?,?)';
  let datas = [
    req.body.label,
    req.body.idList,
  ];
  con.bdd.query(sql, datas, function(err, row) {
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
  con.bdd.query(sql, datas, function(err, row) {
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
  con.bdd.query('DELETE FROM todos WHERE id = ?',[id], function(err, rows) {
      if (err) throw err;
      res.json(rows);
    });
});


module.exports = todosApi;
