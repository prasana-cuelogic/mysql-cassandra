var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET home page. */
router.get('/', function(req, res, next) {
    var data = db(function (rows) {
        console.log(rows);
        res.render('index', { title: 'Express', records: rows});
    });
});

module.exports = router;
