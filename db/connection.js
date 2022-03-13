// const mysql = require('mysql2-promise')();

// const db2 = mysql.createConnection({
//     // host: 'localhost',
//     user: 'root',
//     password: '198small',
//     database: 'biznesstracker',
//     waitForConnections: true
// });


var db = require('mysql2-promise')();
 
db.configure({
    "host": "localhost",
    "user": 'root',
    "password": '198small',
    "database": 'biznesstracker',
});

module.exports = db;