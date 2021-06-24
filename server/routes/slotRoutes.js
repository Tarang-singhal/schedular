const express = require('express');
const uuid = require('uuid4');
const dayjs = require('dayjs');

const pool = require('../connectionPool');

const router = express.Router();

router.get('/getSlots', (req, res) => {
    try {
        const sql = 'SELECT * FROM slots';
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, (err, results) => {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'error' });
                }
                res.json({ message: 'success', slots: results });
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'error' });
    }
});

router.get('/getSlots/:teacher_id', (req, res) => {
    try {
        const {teacher_id} = req.params;
        const sql = `SELECT * FROM slots WHERE teacher_id='${teacher_id}'`;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, (err, results) => {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'error' });
                }
                res.json({ message: 'success', slots: results });
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'error' });
    }
})

router.post('/addSlot', (req, res) => {
    try {
        const { teacher_id, batch_name, start, end } = req.body;
        const id = uuid();
        const sql = `INSERT INTO slots (id, teacher_id, batch_name, start, end) Values ('${id}', '${teacher_id}', '${batch_name}', '${dayjs(start).format('YYYY-MM-DD HH:mm:ss')}', '${dayjs(end).format('YYYY-MM-DD HH:mm:ss')}' )`;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(sql, (err, results) => {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'error' });
                }
                res.json({ message: 'success', id });
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'error' });
    }
})


module.exports = router;