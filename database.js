var express   =    require("express");
var mysql     =    require('mysql');

var pool =    mysql.createPool({
    connectionLimit : 100, //important
    host     : '',
    user     : 'root',
    password : '',
    database : '',
    debug    :  false
});
function handle_database(callback) {

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            return ({"code": 100, "status": "Error in connection database"});
        }
        console.log('connected as id ' + connection.threadId);

        connection.query("select * from users limit 10", function (err, rows) {
            connection.release();
            if (!err) {
                return callback(rows);
            }
        });

        connection.on('error', function (err) {
            return ({"code": 100, "status": "Error in connection database"});
        });
    });
};
module.exports = handle_database;
