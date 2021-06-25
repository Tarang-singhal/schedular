const e = require('express');
const express = require('express');
const uuid = require('uuid4');
const pool = require('../connectionPool');

const router = express.Router();

router.get('/teachers', (req, res) => {
  const sql = `SELECT * FROM teachers`;
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, (err, results) => {
        connection.release();
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'error' });
        }
        res.json({ message: 'success', teachers: results });
      })
    })
  } catch (e) {
    res.status(500).json({ message: 'error' });
  }
})


router.post("/addTeacher", (req, res) => {
  try {

    const { name, expertise, age } = req.body;
    const id = uuid();
    const sql = `INSERT INTO teachers (id, name, expertise, age) VALUES ('${id}', '${name}', '${expertise}', ${age})`;
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, (err, results) => {
        connection.release();
        if (err) {
          throw err;
        }
        res.json({ message: "success", id });
      });

    })

  } catch (e) {

    res.status(500).json({ message: 'error' });

  }
});

router.put("/editTeacher", (req, res) => {
  try {

    const { name, expertise, age, id } = req.body;
    const sql = `UPDATE teachers SET name='${name}', expertise='${expertise}', age=${age} WHERE id='${id}'`;
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, (err, results) => {
        connection.release();
        if (err) {
          throw err;
        }
        res.json({ message: "success", id });
      });

    })

  } catch (e) {

    res.status(500).json({ message: 'error' });

  }
});

router.delete('/deleteTeacher/:id', (req, res) => {
  try {

    const { id } = req.params;
    const sql = `DELETE slots, teachers FROM slots INNER JOIN teachers ON teachers.id = slots.teacher_id WHERE teachers.id = '${id}'`;
    const sql2 = `DELETE FROM teachers WHERE teachers.id = '${id}'`;
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, (err, results) => {
        connection.release();
        if (err) {
          throw err;
        }
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query(sql2, (err, results) => {
            connection.release();
            if (err) {
              throw err;
            }
            res.json({ message: "success", id });
          })
        })
      })

    })

  } catch (e) {

    res.status(500).json({ message: 'error' });

  }
})

module.exports = router;