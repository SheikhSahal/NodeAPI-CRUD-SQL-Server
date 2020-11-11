'use strict';
var express = require('express');
var router = express.Router();

var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');

/* Get All Students */
router.get('/', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("SELECT * FROM test;");
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("Something Went Wrong !!!");
    })
});

/* Add Student */
router.post('/addStudent', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("INSERT INTO test (Name,email) VALUES('" + req.body.Name + "', '" + req.body.email + "')");
    }).then(result => {
        res.status(200).send("Student Added Successfully.");
    }).catch(err => {
        res.status(415).send("Something Went Wrong !!!");
    })
});

/* Delete Student */
router.get('/deleteStudent/:ID', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("DELETE FROM test WHERE ID = " + req.params.ID);
    }).then(result => {
        res.status(200).send("Student Deleted Successfully.");
    }).catch(err => {
        res.status(500).send("Something Went Wrong !!!");
    })
});

/* Edit Student */
router.get('/editStudent/:ID', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("SELECT * FROM test WHERE ID = " + req.params.ID);
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("Something Went Wrong !!!");
    })
});

/* Update Student */
router.post('/updateStudent', function (req, res) {    
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("update test  set Name =  '" + req.body.Name + "', email ='" + req.body.email + "' where id =" + req.body.stID);
        return sql.query("	update test  set Name = 'ST', email = 'ST@gmail.com' where id = 1");
    }).then(result => {
        res.status(200).send("Student Updated Successfully.");
    }).catch(err => {
        res.status(500).send("Something Went Wrong !!!");
    })
});

module.exports = router;
